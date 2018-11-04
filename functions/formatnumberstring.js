module.exports = function (num, length) {
    var strnum = "" + num;
    while (strnum.length < length) {
        strnum = "0" + strnum;
    }
    return strnum;
}
