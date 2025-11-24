
async function sendFeishuWebhook(payload: any) {
  const url = process.env.FEISHU_WEBHOOK_URL
  const secret = process.env.FEISHU_WEBHOOK_SECRET
  if (!url) throw new Error('Missing FEISHU_WEBHOOK_URL')

  let body: any = {
    msg_type: 'text',
    content: { text: payload.text },
  }

  if (secret) {
    const ts = Math.floor(Date.now() / 1000).toString()
    const crypto = await import('crypto')
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(ts + '\n' + secret)
    const sign = hmac.digest('base64')
    body = { ...body, timestamp: ts, sign }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Feishu webhook error: ${res.status} ${text}`)
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { name, email, subject, message } = req.body || {}
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'Invalid payload' })
      return
    }

    const text = `【联系表单】\n姓名: ${name}\n邮箱: ${email}\n主题: ${subject}\n消息: ${message}`
    await sendFeishuWebhook({ text })
    res.status(200).json({ ok: true })
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Internal Server Error' })
  }
}
