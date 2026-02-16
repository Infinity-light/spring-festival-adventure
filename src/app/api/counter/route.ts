import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = process.env.COUNTER_DATA_DIR || path.join(process.cwd(), 'data')
const COUNTER_FILE = path.join(DATA_DIR, 'counter.json')

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch { /* already exists */ }
}

async function readCounter(): Promise<number> {
  try {
    const raw = await fs.readFile(COUNTER_FILE, 'utf-8')
    const data = JSON.parse(raw)
    return typeof data.count === 'number' ? data.count : 0
  } catch {
    return 0
  }
}

async function writeCounter(count: number) {
  await ensureDataDir()
  await fs.writeFile(COUNTER_FILE, JSON.stringify({ count }), 'utf-8')
}

export async function POST() {
  try {
    const current = await readCounter()
    const next = current + 1
    await writeCounter(next)
    return NextResponse.json({ number: next })
  } catch {
    return NextResponse.json({ error: 'Failed to update counter' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = await readCounter()
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ error: 'Failed to read counter' }, { status: 500 })
  }
}
