var a = [
    {
        "auctionUniqueId": "1105-60-3373",
        "organization": 60,
        "roundName": "Předkládání nabídek",
        "itemId": 59861,
        "participant": 5999,
        "newValue": 12350,
        "timestamp": 1596636897000
    },
    {
        "auctionUniqueId": "1105-60-3373",
        "organization": 60,
        "roundName": "Předkládání nabídek",
        "itemId": 59861,
        "participant": 8976,
        "newValue": 13658.4,
        "timestamp": 1596636957000
    },
    {
        "auctionUniqueId": "1105-60-3373",
        "organization": 60,
        "roundName": "Předkládání nabídek",
        "itemId": 59861,
        "participant": 11070,
        "newValue": 14645,
        "timestamp": 1596637748000
    },
    {
        "auctionUniqueId": "1105-60-3373",
        "organization": 60,
        "roundName": "Předkládání nabídek",
        "itemId": 59861,
        "participant": 11070,
        "newValue": 14645,
        "timestamp": 1596637748000
    },
    {
        "auctionUniqueId": "1105-60-3373",
        "organization": 60,
        "roundName": "Předkládání nabídek",
        "itemId": 59861,
        "participant": 11070,
        "newValue": 14645,
        "timestamp": 1596637748000
    }

]

function objectify(array) {
    return array.reduce(function (p, c) {
        p[c[0]] = c.slice(1);
        return p;
    }, {});
}
function get_data(arr) {
    var b = []
    for (var i = 0; i < arr.length; i++) {
        var arr1 = []
        arr1.push(arr[i].participant)
        for (var j = 0; j < arr.length; j++) {
            if (arr[i].participant == arr[j].participant)
                arr1.push(arr[j].newValue)
        }

        b.push(arr1)
    }
    var t = objectify(b)
    return t
}
var x = get_data(a)
console.log(x)
var uni_p =[5999,11070, 8976]

for(var i=0;i < uni_p.length;i++){
 console.log(x[uni_p[i]])
 }