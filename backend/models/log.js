import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: 1
    },
    user_id: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true,
        index: 1
    },
    food_ids: {
        type: [Number],
        required: true
    },
    tCals: {
        type: Number,
        default: 0
    },
    tgCarbs: {
        type: Number,
        default: 0
    },
    tgProtein: {
        type: Number,
        default: 0
    },
    tgFat: {
        type: Number,
        default: 0
    },
    metcalTarget: {
        type: Boolean,
        default: false
    },
    calsLeft: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

logSchema.methods.calcMacros = async function (foods, users) {
    const foodItems = this.food_ids.map(id => foods.find(food => food.id === id));
    const user = users.find(user => user.id === this.user_id);

    this.tCals = foodItems.reduce((acc, food) => acc + food.cals, 0);
    this.tgCarbs = foodItems.reduce((acc, food) => acc + food.gcarbs, 0);
    this.tgProtein = foodItems.reduce((acc, food) => acc + food.gprotein, 0);
    this.tgFat = foodItems.reduce((acc, food) => acc + food.gfat, 0);
    this.metcalTarget = this.tCals >= user.tarCals && this.tCals <= user.tarCals * 1.10;
    this.calsLeft = user.tarCals - this.tCals;

    await this.save();
};

const Log = mongoose.model('Log', logSchema);
export default Log;