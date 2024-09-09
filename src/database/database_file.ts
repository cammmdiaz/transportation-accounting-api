import { promises as fs } from "fs"

const ENCODING = "utf8"

async function fileExists(path: string): Promise<boolean> {
    return fs.access(path)
        .then(() => true)
        .catch(() => false)
}

export async function append(path: string, entity: {}) {
    let entities: any[] = []

    const exists = await fileExists(path)
    if (exists) {
        const existingData = await fs.readFile(path, ENCODING)
        if (existingData && existingData !== "") {
            entities = JSON.parse(existingData)
        }  
    }

    entities.push(entity)

    await fs.writeFile(path, JSON.stringify(entities), ENCODING)
}

export async function read(path: string): Promise<any[]> {
    const exists = await fileExists(path)
    if (!exists) {
        return []
    }

    const entitiesJson = await fs.readFile(path, ENCODING)
    return entitiesJson === "" ? [] : JSON.parse(entitiesJson) as any[]
}