import { Router, Request, Response } from 'express'
import { database } from '../database'
const router = Router()

function removeDuplicates(arr, key) {
  if (!(arr instanceof Array) || key && typeof key !== 'string') {
    return false;
  }
  if (key && typeof key === 'string') {
    return arr.filter((obj, index, arr) => {
      return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
    });
  } else {
    return arr.filter(function (item, index, arr) {
      return arr.indexOf(item) == index;
    });
  }
}

router.get('/stats', async (req: Request, res: Response) => {
  const db = await database()
  const auctionStats = await db.get(
    `SELECT
      COUNT(DISTINCT auctionUniqueId) as auctions,
      COUNT(DISTINCT organization) as organizations
    FROM auctions`
  )
  const savings = await db.get(
    'SELECT AVG(savingComparison) AS avgSavings FROM auctions WHERE savingComparison != 0 AND savingComparison != 1'
  )
  const participants = await db.get(
    'SELECT COUNT(DISTINCT participant) AS participants FROM offers'
  )
  var data = [
    auctionStats,
    savings,
    participants
  ]
  return res.render("stats/stats", { data: data })
})

router.get('/stats/category/:category', async (req: Request, res: Response) => {
  const db = await database()
  const { category } = req.params
  const auctionStats = await db.get(
    `SELECT 
      COUNT(DISTINCT auctionUniqueId) as auctions,
      COUNT(DISTINCT organization) as organizations
    FROM auctions
    WHERE category = ?`,
    category
  )
  const savings = await db.get(
    `SELECT 
      AVG(savingComparison) AS avgSavings
    FROM auctions WHERE savingComparison != 0 AND savingComparison != 1 AND category = ?`,
    category
  )
  const participants = await db.get(
    `SELECT
      COUNT(DISTINCT participant) AS participants
    FROM offers 
    WHERE auctionUniqueId IN (SELECT auctionUniqueId FROM auctions WHERE category = ?)`,
    category
  )
  const ll = await db.all(
    'SELECT category FROM auctions '
  )
  var t = removeDuplicates(ll, "category")

  var data = [
    auctionStats,
    savings,
    participants
  ]
  var cat = req.params
  return res.render("stats/stats_cat", { data: data, ll: t, name: cat })
})

router.get(
  '/stats/subcategory/:category',
  async (req: Request, res: Response) => {
    const db = await database()
    const { category } = req.params
    const auctionStats = await db.get(
      `SELECT 
        COUNT(DISTINCT auctionUniqueId) as auctions,
        COUNT(DISTINCT organization) as organizations
      FROM auctions
      WHERE subcategory = ?`,
      category
    )
    const savings = await db.get(
      `SELECT 
        AVG(savingComparison) AS avgSavings
      FROM auctions WHERE savingComparison != 0 AND savingComparison != 1 AND subcategory = ?`,
      category
    )
    const participants = await db.get(
      `SELECT
        COUNT(DISTINCT participant) AS participants
      FROM offers 
      WHERE auctionUniqueId IN (SELECT auctionUniqueId FROM auctions WHERE subcategory = ?)`,
      category
    )
    const ll = await db.all(
      'SELECT subcategory FROM auctions '
    )
    var t = removeDuplicates(ll, "subcategory")
    var data = [
      auctionStats,
      savings,
      participants
    ]
    var cat = req.params
    return res.render("stats/stats_subcat", { data: data, ll: t, name: cat })
  }
)

















export const global = router
