import { Router, Request, Response } from 'express'
import { database } from '../database'
const router = Router()
/*
router.get('/participants', async (req: Request, res: Response) => {
    const db = await database()
    const row = await db.all(
        'SELECT DISTINCT participant  FROM offers ORDER BY participant DESC'
    )
    var a = row.map((row) => row['participant'])
    return res.render("participants/part", { data:a})
})
*/
router.get('/participants/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const db = await database()
    const myAuctions = await db.all(
        'SELECT * FROM auctions WHERE auctionUniqueId IN (SELECT DISTINCT auctionUniqueId FROM "offers" WHERE participant = ?)',
        [id]
    )
    const row = await db.all(
        'SELECT DISTINCT participant  FROM offers ORDER BY participant DESC'
    )
    var a = row.map((row) => row['participant'])

    return res.render("participants/part_idx", {
        participant: id,
        auctions: myAuctions,
        data: a
    })
})

export const participants = router
