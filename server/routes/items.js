import express from 'express';
import Item from '../models/Item.js';
const router = express.Router();

// get all items
router.get('/', async (req, res) =>{
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// POST create a new item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// PUT update an existing item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }
        // update the item fields with the new data
        item.name = req.body.name || item.name;
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// Delete an item
router.delete("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(item == null){
            return res.status(404).json({message: 'Item not found'});
        }
        await item.deleteOne();
        res.json({message: 'Item deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;