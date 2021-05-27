import { Router, Request, Response } from 'express'
import { couldStartTrivia } from 'typescript';
import { database } from '../database'

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


const router = Router()
router.get('/', async (req: Request, res: Response) => {
  const db = await database()
  const row = await db.all(
    'SELECT country, count(country) FROM auctions group by country'
  )

  return res.render("index", { data: row })
})

router.get('/auctions/new', async (req: Request, res: Response) => {
  const db = await database()
  const row = await db.all(
    'SELECT * FROM auctions ORDER BY auctionStart DESC LIMIT 15'
  )
  return res.render("auctions/auc_new", { data: row })
})



router.get('/auctions/q/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const db = await database()
  const row = await db.all(
    `SELECT * FROM auctions WHERE auctionName LIKE "%${name}%" LIMIT 5`
  )
  const ll = await db.all(
    'SELECT * FROM auctions LIMIT 5000'
  )
  const offers = await db.all(
    'SELECT * FROM offers WHERE auctionUniqueId = ?',
    [row[0].auctionUniqueId]
  )
  var t = removeDuplicates(ll, "auctionName")
  //console.log(row)
  //console.log(offers)
  return res.render("auctions/auc_name", { data: row, offers: offers, ll: t })
})

router.get('/auctions/:auctionId', async (req: Request, res: Response) => {
  const { auctionId } = req.params
  const db = await database()
  const row = await db.get('SELECT * FROM auctions WHERE auctionUniqueId = ?', [
    auctionId,
  ])
  const offers = await db.all(
    'SELECT * FROM offers WHERE auctionUniqueId = ?',
    [auctionId]
  )
  const ll = await db.all(
    'SELECT * FROM auctions LIMIT 5000'
  )
  var t = removeDuplicates(ll, "auctionUniqueId")
  //console.log(row)
  //console.log(offers)
  return res.render("auctions/auc", { data: row, offers: offers, ll: t })
})

export const auctions = router
