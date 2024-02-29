const express = require ("express")
const router = express ()

router.use("/api/users", require ("./UserRotas"));

//ROta de teste
router.get("/",(req,res) => {
    res.send("A API esta funcionando com Postman.")
})

module.exports = router