"""
Data Pocket – WhatsApp GIF Generator
- WhatsApp light theme with tiled wallpaper background
- Purple bubbles (left) = Data Pocket AI
- Green bubbles (right) = owner/user
- Farmacia + Varejo: AI initiates (morning briefing)
- Restaurante + Servicos: USER initiates (asking for insights)
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Canvas ────────────────────────────────────────────────────────────────────
W, H = 400, 760

# ── Brand Colors (matches LP) ─────────────────────────────────────────────────
HEADER_BG    = (22,  163,  74)   # #16a34a  brand green dark
HEADER_TEXT  = (255, 255, 255)
ONLINE_COL   = (167, 243, 208)   # light green

WALLPAPER_BASE = (236, 229, 221)  # classic WhatsApp cream (keep)
WALLPAPER_DOT  = (210, 200, 190)  # subtle pattern color

BUBBLE_AI    = (255, 255, 255)    # white – Data Pocket (left)
BUBBLE_AI_TXT= (17,  17,  17)     # #111111
BUBBLE_USER  = (220, 252, 231)    # #DCFCE7 – brand green tint (right)
BUBBLE_USER_TXT = (17, 17, 17)

CHECK_COL    = (34,  197,  94)   # #22c55e brand green
TIME_COL     = (100, 100, 100)

PILL_BG      = (226, 232, 240)   # #E2E8F0
PILL_TXT     = (85,  85,  85)

WHITE        = (255, 255, 255)

# ── Timing ────────────────────────────────────────────────────────────────────
DELAY_INTRO  = 400
DELAY_TYPING = 850
DELAY_MSG    = 650
DELAY_FINAL  = 3000

# ── Fonts ─────────────────────────────────────────────────────────────────────
_REG = _BOLD = None
for p in ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]:
    if os.path.exists(p): _REG = p; break
for p in ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf"]:
    if os.path.exists(p): _BOLD = p; break

def fnt(size, bold=False):
    path = _BOLD if bold else _REG
    return ImageFont.truetype(path, size) if path else ImageFont.load_default()


# ── Wallpaper ─────────────────────────────────────────────────────────────────

def draw_wallpaper(draw):
    """WhatsApp-style tiled wallpaper: subtle rotated squares grid."""
    draw.rectangle([0, 0, W, H], fill=WALLPAPER_BASE)
    step = 26
    sq = 6
    for row in range(-1, H // step + 2):
        for col in range(-1, W // step + 2):
            cx = col * step + (step // 2 if row % 2 else 0)
            cy = row * step
            # small rotated square (diamond)
            pts = [
                (cx,      cy - sq),
                (cx + sq, cy),
                (cx,      cy + sq),
                (cx - sq, cy),
            ]
            draw.polygon(pts, outline=WALLPAPER_DOT, fill=None)
            # center dot
            draw.ellipse([cx-1, cy-1, cx+1, cy+1], fill=WALLPAPER_DOT)


# ── Header ────────────────────────────────────────────────────────────────────

def draw_header(draw, name, subtitle="Online agora"):
    draw.rectangle([0, 0, W, 66], fill=HEADER_BG)

    # back arrow
    draw.text((10, 33), "<", fill=(200, 230, 200), font=fnt(15), anchor="lm")

    # avatar circle – dark brand style (matches LP logo)
    cx, cy, r = 44, 33, 17
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(17, 17, 17))
    draw.text((cx, cy), "DP", fill=WHITE, font=fnt(11, bold=True), anchor="mm")

    # name + status
    draw.text((70, 20), name,     fill=WHITE,      font=fnt(15, bold=True))
    draw.ellipse([70, 39, 77, 46], fill=ONLINE_COL)
    draw.text((83, 42), subtitle, fill=ONLINE_COL, font=fnt(11), anchor="lm")

    # menu dots
    for dx in [W-28, W-18, W-8]:
        draw.ellipse([dx-2, 28, dx+2, 38], fill=(180, 220, 180))


# ── Date pill ─────────────────────────────────────────────────────────────────

def draw_pill(draw, text, y):
    f = fnt(11)
    tw = draw.textbbox((0,0), text, font=f)[2]
    pw, ph = tw + 24, 22
    x1 = (W - pw) // 2
    draw.rounded_rectangle([x1, y, x1+pw, y+ph], radius=11, fill=PILL_BG)
    draw.text((W//2, y+11), text, fill=PILL_TXT, font=f, anchor="mm")
    return ph + 10


# ── Text wrap ─────────────────────────────────────────────────────────────────

def wrap(text, draw, f, max_w):
    result = []
    for paragraph in text.split("\n"):
        if paragraph.strip() == "":
            result.append("")
            continue
        words, cur = paragraph.split(" "), ""
        for w in words:
            test = (cur + " " + w).strip()
            if draw.textbbox((0,0), test, font=f)[2] > max_w and cur:
                result.append(cur); cur = w
            else:
                cur = test
        if cur:
            result.append(cur)
    return result or [""]


# ── Bubble ────────────────────────────────────────────────────────────────────

def draw_bubble(draw, text, time_str, y, is_ai, is_first=False):
    f   = fnt(14)
    f_t = fnt(10)
    max_w = 252

    lines = wrap(text, draw, f, max_w)
    lh, eh = 21, 8   # line height, empty-line height

    text_h = sum(eh if l == "" else lh for l in lines)
    bh = text_h + 36

    non_empty = [l for l in lines if l]
    bw_t = max((draw.textbbox((0,0), l, font=f)[2] for l in non_empty), default=60)
    tw   = draw.textbbox((0,0), time_str, font=f_t)[2]
    bw   = max(bw_t + 28, tw + 44, 80)
    bw   = min(bw, 292)

    margin = 12
    r = 12

    if is_ai:
        x1, x2  = margin, margin + bw
        fill     = BUBBLE_AI
        txt_col  = BUBBLE_AI_TXT
        if is_first:
            draw.polygon([(x1+1, y+10), (x1-7, y+3), (x1+1, y+22)], fill=fill)
    else:
        x1, x2  = W - margin - bw, W - margin
        fill     = BUBBLE_USER
        txt_col  = BUBBLE_USER_TXT
        if is_first:
            draw.polygon([(x2-1, y+10), (x2+7, y+3), (x2-1, y+22)], fill=fill)

    draw.rounded_rectangle([x1, y, x2, y+bh], radius=r, fill=fill)

    # subtle top border for AI bubble
    if is_ai:
        draw.rounded_rectangle([x1, y, x2, y+bh], radius=r,
                                outline=(180, 160, 240), width=1)

    ty = y + 12
    for line in lines:
        if line == "":
            ty += eh
        else:
            draw.text((x1+14, ty), line, fill=txt_col, font=f)
            ty += lh

    # time + checkmark
    time_y = y + bh - 15
    draw.text((x2 - 40, time_y), time_str, fill=TIME_COL, font=f_t, anchor="rs")
    if not is_ai:
        # draw two tiny v-checkmarks
        for ox in [x2-22, x2-16]:
            pts = [ox, time_y+4, ox+3, time_y+7, ox+7, time_y]
            draw.line(pts, fill=CHECK_COL, width=2)

    return bh + 6


# ── Typing indicator ──────────────────────────────────────────────────────────

def draw_typing(draw, y, dot_frame):
    bw, bh = 68, 36
    x1, x2 = 12, 12 + bw
    draw.rounded_rectangle([x1, y, x2, y+bh], radius=12, fill=BUBBLE_AI)
    draw.rounded_rectangle([x1, y, x2, y+bh], radius=12,
                            outline=(180, 160, 240), width=1)
    draw.polygon([(x1+1, y+10), (x1-7, y+3), (x1+1, y+22)], fill=BUBBLE_AI)
    phase = dot_frame % 3
    for i, cx in enumerate([x1+14, x1+29, x1+44]):
        r = 5 if i == phase else 4
        col = (34, 197, 94) if i == phase else (100, 180, 120)
        draw.ellipse([cx-r, y+bh//2-r, cx+r, y+bh//2+r], fill=col)
    return bh + 6


# ── Frame factory ─────────────────────────────────────────────────────────────

def make_frame(msgs_visible, contact, typing=False, dot_frame=0, date_label="Hoje"):
    img  = Image.new("RGB", (W, H), WALLPAPER_BASE)
    draw = ImageDraw.Draw(img)
    draw_wallpaper(draw)
    draw_header(draw, contact)

    y = 74
    y += draw_pill(draw, date_label, y)

    prev_ai = None
    for text, time_str, is_ai in msgs_visible:
        is_first = (prev_ai != is_ai)
        y += draw_bubble(draw, text, time_str, y, is_ai, is_first)
        prev_ai = is_ai

    if typing:
        draw_typing(draw, y, dot_frame)

    return img


# ── GIF builder ───────────────────────────────────────────────────────────────

def build_gif(contact, messages, out_path, date_label="Hoje"):
    frames, durations = [], []

    def push(img, ms):
        frames.append(img); durations.append(ms)

    push(make_frame([], contact, date_label=date_label), DELAY_INTRO)

    visible = []
    for i, msg in enumerate(messages):
        is_ai   = msg[2]
        is_last = (i == len(messages) - 1)

        if is_ai:
            for df in range(3):
                push(make_frame(visible, contact, typing=True,
                                dot_frame=df, date_label=date_label),
                     DELAY_TYPING // 3)

        visible.append(msg)
        push(make_frame(visible, contact, date_label=date_label),
             DELAY_FINAL if is_last else DELAY_MSG)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    frames[0].save(
        out_path, save_all=True, append_images=frames[1:],
        loop=0, duration=durations, optimize=False,
    )
    print(f"OK: {out_path}")


# ── Scenarios ─────────────────────────────────────────────────────────────────
# is_ai = True  → purple bubble, left  (Data Pocket)
# is_ai = False → green bubble,  right (owner)
#
# Farmacia + Varejo  → AI inicia (briefing matinal)
# Restaurante + Servicos → USUARIO inicia

SCENARIOS = {

    # IA INICIA — resumo matinal da farmacia
    "farmacia": {
        "contact": "Data Pocket",
        "date": "Hoje, 07:30",
        "messages": [
            ("Bom dia! Resumo da sua farmacia:\n\n> Mais vendido: Dipirona 500mg — 48 unidades.\n> Critico: Amoxicilina 875mg (12 cx restantes).\n> Faturamento: R$ 4.320 (+12% vs semana passada).", "07:30", True),
            ("Qual produto teve a maior margem ontem?", "07:31", False),
            ("Maior margem: Vitamina D3 — 48%.\n\nVale destacar na gondola e sugerir no balcao para aumentar o ticket medio.", "07:32", True),
            ("E sobre o estoque critico, ja consigo pedir?", "07:33", False),
            ("Sim! Lista gerada:\n\n> Amoxicilina 875mg — pedir 60 cx\n  (giro estimado: 4 dias)", "07:34", True),
        ],
    },

    # IA INICIA — alerta de queda no varejo
    "varejo": {
        "contact": "Data Pocket",
        "date": "Hoje, 08:00",
        "messages": [
            ("Bom dia! Resumo do seu varejo:\n\n[-] Tenis: queda de 22% essa semana.\n[+] Camisetas oversize: alta de 34% (M e G).\n[*] Top vendedor: Carlos — R$ 8.400.", "08:00", True),
            ("Qual o motivo da queda nos tenis?", "08:01", False),
            ("Analisando:\n\n> Preco subiu 15% na ultima reposicao.\n> Concorrente baixou 10% no periodo.\n\nSugestao: campanha relampago 10% off por 48h.", "08:02", True),
            ("Quanto isso impacta minha margem?", "08:03", False),
            ("Margem atual: 38%.\nCom 10% de desconto: cai para ~31%.\n\nSe girar +40 pares, o lucro total ainda sobe.", "08:04", True),
        ],
    },

    # USUARIO INICIA — dono pergunta sobre o restaurante
    "restaurante": {
        "contact": "Data Pocket",
        "date": "Hoje, 09:15",
        "messages": [
            ("Qual foi o prato mais pedido essa semana e qual a margem?", "09:15", False),
            ("Mais pedido: Risoto de Funghi — 34 pedidos.\nMargem: 24% — melhor do cardapio.\n\nAtencao: CMV geral subiu para 38% (ideal: abaixo de 32%).", "09:16", True),
            ("O que esta puxando o CMV pra cima?", "09:17", False),
            ("Salmao Grelhado com CMV de 52%.\n\nInsumo subiu 18% mas o preco do prato nao foi ajustado.\n\nRecomendo reajuste de R$ 8 ou substituir por tilapia por 30 dias.", "09:18", True),
            ("Faz sentido. O que devo destacar hoje?", "09:19", False),
            ("Destaque o Risoto de Funghi — melhor margem e alta demanda.\nOriente o garcom a sugerir como prato principal esta noite.", "09:20", True),
        ],
    },

    # USUARIO INICIA — dono pergunta sobre empresa de servicos
    "servicos": {
        "contact": "Data Pocket",
        "date": "Hoje, 07:45",
        "messages": [
            ("Como esta minha empresa hoje?", "07:45", False),
            ("Resumo:\n\n> 8 ordens de servico abertas.\n> Conclusao no prazo: 74% (meta: 90%).\n> NPS medio: 8,2.", "07:46", True),
            ("Por que a taxa de conclusao caiu?", "07:47", False),
            ("Analisando a equipe:\n\n> Andre: 3 OS atrasadas (pecas em falta).\n> Marcos: rota com +40 km extras por dia.\n\nReorganizar a rota do Marcos economiza ~2h/dia.", "07:48", True),
            ("Quais clientes estao esperando mais?", "07:49", False),
            ("Top 3 em espera:\n\n1. Empresa Alpha — 5 dias\n2. Clinica Beta — 3 dias\n3. Condominio Sol — 2 dias\n\nEnvio atualizacao para eles agora?", "07:50", True),
        ],
    },
}


if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    for key, data in SCENARIOS.items():
        out = os.path.join(base, f"whatsapp_{key}.gif")
        build_gif(
            contact=data["contact"],
            messages=data["messages"],
            out_path=out,
            date_label=data.get("date", "Hoje"),
        )
    print("\nTodos os GIFs gerados com sucesso!")
