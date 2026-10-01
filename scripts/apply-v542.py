#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply-v542.py — 无幻觉专项修正（仅 EpomailDocs 仓）
① data-security §2「安全与限流记录」行：删除代码中不存在的「滑动窗口请求计数」幻觉描述，
   改为实际机制（登录失败计数 KV 12h／注册频控记录每日清理／AI 用量统计 KV 60 日）
② project.md §2.2 默认标签名对码：社交→社群、推广→推销，并补漏「工作」（default-labels.js 四标签）
运行：python scripts/apply-v542.py
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / 'src' / 'content' / 'docs'
LOCS = ['mail', 'zh-tw', 'en', 'fr', 'es', 'nl']
M = dict(zip(LOCALES := LOCS, ['zh', 'zh-tw', 'en', 'fr', 'es', 'nl']))
changed = []

def dp(doc, loc):
    return DOCS / 'mail' / f'{doc}.md' if loc == 'mail' else DOCS / loc / 'mail' / f'{doc}.md'

def load(doc, loc):
    return dp(doc, loc).read_text(encoding='utf-8')

def save(doc, loc, text):
    dp(doc, loc).write_text(text, encoding='utf-8', newline='\n')
    changed.append(f'{loc}/{doc}')

# ============================================================
# ① data-security 限流行整行重置 ×6
# ============================================================
RATE_ROW_OLD = {
    'zh':    '| 安全与限流记录 | 登录失败计数、人机验证状态、滑动窗口请求计数 | 暴力破解防护、滥用防治 | Cloudflare KV；滑动窗口计数器 | 阈值触发后 12 小时内自动过期重置 |',
    'zh-tw': '| 安全與限流紀錄 | 登入失敗計數、人機驗證狀態、滑動視窗請求計數 | 暴力破解防護、濫用防治 | Cloudflare KV；滑動視窗計數器 | 閾值觸發後 12 小時內自動過期重置 |',
    'en':    '| Security and rate-limiting records | Login failure counts, human verification status, sliding-window request counts | Brute-force protection, abuse prevention | Cloudflare KV; sliding-window counters | Automatically expire and reset within 12 hours after a threshold is triggered |',
    'fr':    "| Journaux de sécurité et de limitation de débit | compteur d'échecs de connexion, état de la vérification humaine, compteurs de requêtes à fenêtre glissante | protection contre la force brute, prévention des abus | Cloudflare KV ; compteurs à fenêtre glissante | expiration et réinitialisation automatiques dans les 12 heures après déclenchement du seuil |",
    'es':    '| Registros de seguridad y de limitación de frecuencia | Recuento de fallos de inicio de sesión, estado de la verificación humana, recuentos de solicitudes en ventana deslizante | Protección contra la fuerza bruta, prevención de abusos | Cloudflare KV; contadores en ventana deslizante | Caducan automáticamente y se reinician en un plazo de 12 horas tras activarse un umbral |',
    'nl':    '| Beveiligings- en frequentiebeperkingsrecords | aantallen mislukte aanmeldingen, status van mensverificatie, verzoektellers per schuivend venster | bescherming tegen brute force, preventie van misbruik | Cloudflare KV; tellers per schuivend venster | vervallen automatisch en worden binnen 12 uur na drempeloverschrijding gereset |',
}
RATE_ROW_NEW = {
    'zh':    '| 安全与限流记录 | 登录失败计数、注册频控记录、AI 用量统计 | 暴力破解防护、滥用防治 | Cloudflare KV；固定窗口计数器 | 登录失败计数 12 小时内自动过期；注册频控记录每日例行清理；AI 用量统计保留 60 日 |',
    'zh-tw': '| 安全與限流紀錄 | 登入失敗計數、註冊頻控記錄、AI 用量統計 | 暴力破解防護、濫用防治 | Cloudflare KV；固定視窗計數器 | 登入失敗計數 12 小時內自動過期；註冊頻控記錄每日例行清理；AI 用量統計保留 60 日 |',
    'en':    '| Security and rate-limiting records | Login failure counts, registration throttling records, AI usage statistics | Brute-force protection, abuse prevention | Cloudflare KV; fixed-window counters | Login failure counters expire automatically within 12 hours; registration throttling records are cleared by the daily routine; AI usage statistics are retained for 60 days |',
    'fr':    "| Journaux de sécurité et de limitation de débit | compteur d'échecs de connexion, enregistrements de limitation d'inscription, statistiques d'utilisation de l'IA | protection contre la force brute, prévention des abus | Cloudflare KV ; compteurs à fenêtre fixe | le compteur d'échecs de connexion expire automatiquement dans les 12 heures ; les enregistrements de limitation d'inscription sont purgés par la routine quotidienne ; les statistiques d'utilisation de l'IA sont conservées 60 jours |",
    'es':    '| Registros de seguridad y de limitación de frecuencia | Recuento de fallos de inicio de sesión, registros de limitación de registro, estadísticas de uso de IA | Protección contra la fuerza bruta, prevención del abuso | Cloudflare KV; contadores de ventana fija | El recuento de fallos de inicio de sesión caduca automáticamente en 12 horas; los registros de limitación de registro se depuran en la rutina diaria; las estadísticas de uso de IA se conservan 60 días |',
    'nl':    '| Beveiligings- en frequentiebeperkingsrecords | aantallen mislukte aanmeldingen, registratiebeperkingsrecords, AI-gebruiksstatistieken | bescherming tegen brute force, preventie van misbruik | Cloudflare KV; tellers met vast venster | de aanmeldingsteller vervalt automatisch binnen 12 uur; registratiebeperkingsrecords worden door de dagelijkse routine gewist; AI-gebruiksstatistieken worden 60 dagen bewaard |',
}
for loc in LOCS:
    text = load('data-security', loc)
    old, new = RATE_ROW_OLD[M[loc]], RATE_ROW_NEW[M[loc]]
    if new in text:
        continue
    assert old in text, f'[限流行] {loc} 旧文未命中'
    text = text.replace(old, new)
    save('data-security', loc, text)
print('① data-security 限流行修正 完成')

# ============================================================
# ② project.md 默认标签名对码 ×6
# ============================================================
LABEL_OLD = {
    'zh':    '内置默认模板（社交、订阅、推广）',
    'zh-tw': '內建預設範本（社交、訂閱、推廣）',
    'en':    'default templates (Social, Subscriptions, Promotions)',
    'fr':    'modèles par défaut intégrés (Social, Abonnements, Promotions)',
    'es':    'plantillas predeterminadas integradas (Social, Suscripciones, Promociones)',
    'nl':    'standaardsjablonen (Sociaal, Abonnementen, Promoties)',
}
LABEL_NEW = {
    'zh':    '内置默认模板（社群、订阅、推销、工作）',
    'zh-tw': '內建預設範本（社群、訂閱、推銷、工作）',
    'en':    'default templates (Community, Subscriptions, Promotions, Work)',
    'fr':    'modèles par défaut intégrés (Communauté, Abonnements, Promotions, Travail)',
    'es':    'plantillas predeterminadas integradas (Comunidad, Suscripciones, Promociones, Trabajo)',
    'nl':    'standaardsjablonen (Gemeenschap, Abonnementen, Promoties, Werk)',
}
for loc in LOCS:
    text = load('project', loc)
    old, new = LABEL_OLD[M[loc]], LABEL_NEW[M[loc]]
    if new in text:
        continue
    assert old in text, f'[标签句] {loc} 旧文未命中'
    text = text.replace(old, new)
    save('project', loc, text)
print('② project 标签句修正 完成')
print(f'\n共写盘 {len(changed)} 次，全部断言通过。')
