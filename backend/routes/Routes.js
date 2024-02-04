const express = require ("express")
const router = express ()

//ROta de teste
router.get("/",(req,res) => {
    res.send("A API esta funcionando com Postman.")
})

module.exports = router