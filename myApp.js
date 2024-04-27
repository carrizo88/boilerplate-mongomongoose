require('dotenv').config();
let mongoose = require('mongoose')
console.log('process.env.MONGO_URI',process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: Array
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = async (done) => {
  let person = new Person({
    name: 'Franco',
  age: 30,
  favoriteFoods: ['sape']
  })
  person.save((err, data)=>{
  if(err) done(err)
   else done(null , data);
  });

};

const createManyPeople = async (arrayOfPeople, done) => {
 await Person.create(arrayOfPeople,(err, data)=>{
  if(err) done(err)
   else done(null , data);
  });

};

const findPeopleByName = async (personName, done) => {
  await Person.find({name:personName},(err, data)=>{
    if(err) done(err)
     else done(null , data);
    });
};

const findOneByFood = async (food, done) => {
  await Person.findOne({favoriteFoods:food},(err, data)=>{
    if(err) done(err)
     else done(null , data);
    });
};

const findPersonById = async (personId, done) => {
  await Person.findById({_id:personId},(err, data)=>{
    if(err) done(err)
     else done(null , data);
    });
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const person = await Person.findById({_id:personId},(err)=>{
    if(err) done(err)
    });
    person.favoriteFoods.push(foodToAdd)
    return person.save((err, data)=>{
      if(err) done(err)
       else done(null , data);
      });
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
   let personUpdated= await Person.findOneAndUpdate({name:personName},{age: ageToSet},{new:true});
    done(null , personUpdated);
};

const removeById = async (personId, done) => {
  await Person.findByIdAndRemove({_id:personId},(err, data)=>{
    if(err) done(err)
     else done(null , data);
    });
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  await Person.remove({name:nameToRemove},(err, data)=>{
    if(err) done(err)
     else done(null , data);
    });
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  await Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('name').exec((err, data)=>{
    if(err) done(err)
     else done(null , data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
