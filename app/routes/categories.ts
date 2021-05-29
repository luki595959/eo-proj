import { Router, Request, Response } from 'express'
import { database } from '../database'
const router = Router()

router.get('/categories', async (req: Request, res: Response) => {
    const db = await database()
    const query = await db.all('SELECT DISTINCT category FROM auctions')
    var a = query.map((row) => row['category'])
    return res.render("categories/cat", { data: a })
})

router.get('/categories/:category', async (req: Request, res: Response) => {
    const { category } = req.params
    const db = await database()
    const query = await db.all(
        'SELECT DISTINCT subcategory FROM auctions WHERE category = ?',
        category
    )
    var a = query.map((row) => row['subcategory'])
    var b = req.params
    return res.render("categories/subcat", { data: a, category: b })
})

export const categories = router
