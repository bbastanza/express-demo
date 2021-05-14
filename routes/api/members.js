const express = require("express");
let members = require("./../../Members");
const uuid = require("uuid");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(members);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const isMemberFound = members.some(m => m.id === id);
    if (!isMemberFound) return res.status(404).json({ msg: `No member with the id of ${id}` });
    res.json(members.filter(m => m.id === id));
});

router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };
    if (!newMember.name || !newMember.email) return res.status(400).json({ msg: "Please include a name and email" });
    members.push(newMember);
    res.json(members);
});

router.put("/:id", (req, res) => {
    const updatedMember = req.body;

    const id = parseInt(req.params.id);

    const isMemberFound = members.some(m => m.id === id);

    if (!isMemberFound) return res.status(404).json({ msg: `No member with the id of ${id}` });
    if (!!!updatedMember.name && !!!updatedMember.email)
        return res.status(404).json({ msg: `Members email or name not specified` });

    members.forEach(x => {
        if (x.id == id) {
            x.name = updatedMember.name ? updatedMember.name : x.name;
            x.email = updatedMember.email ? updatedMember.email : x.email;
        }
    });

    res.json(members);
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const isMemberFound = members.some(m => m.id === id);

    if (!isMemberFound) return res.status(404).json({ msg: `No member with the id of ${id}` });

    res.json({ msg: "Member Deleted", members: members.filter(x => x.id !== id) });
});

module.exports = router;
