
const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');


const app = express();

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

const course = [{name: "artifficial intellegence", code: "CSE321" ,id:1, Desc: "this is very useful"},{name: "control", code: "CSE421" ,id:2, Desc: "useful"}];
const student = [{name: "maisuody", code: 1601501, id:1}];

app.get('/', (req, res) => {
	res.render('inde.ejs', {name: 'mai'});
});

app.get('/api/students/create', (req, res) => {
	res.render('create.ejs');
	
});

app.get('/api/courses/create', (req, res) => {
		res.render('create.ejs');
});

app.get('/api/courses', (req, res) => {
	res.render('coursel.ejs');
	//res.json({"courses":course});

});

app.post('/api/courses', (req, res) =>{

     //const {error} = validationCourse(req.body);

     const schema = Joi.object({
     	name: Joi.string().min(5).required(),
     	code: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
     	Desc: Joi.string().max(300).required()

     });

 //return Joi.validate(courses, schema);
   const result = schema.validate(req.body);
   console.log(result);
   if(result.error){
	//400 bad request
	res.status(400).send(result.error.details[0].message);
	return;
};

course.push ({
		id: course.length +1,
        name: req.body.name,
        code: req.body.code,
        description: req.body.Desc
	});

	res.redirect('/api/courses/create');
	//req.send(course);
	//console.log(course);

});
     



app.get('/api/students', (req, res) => {
	res.render('studentsr.ejs');
	//res.json({"students":student});
});

app.post('/api/students', async (req, res) =>{

     const schema = Joi.object({
     	name: Joi.string().allow('_', '-', ',').required(),
     	code: Joi.string().length(7).pattern(/^[0-9]+$/).required()
     });

 //return Joi.validate(courses, schema);
   const result = schema.validate(req.body);
   console.log(result);
   if(result.error){
	//400 bad request
	res.status(400).send(result.error.details[0].message);
	return;
};

student.push ({
		id: student.length +1,
        name: req.body.name,
        code: req.body.code     
	});

	res.redirect('/api/students/create');
	//res.send(course);
	//console.log(course);

     console.log(student)
});

app.put('/api/courses/', function(req, res){
    i = course.findIndex(courses => courses.id == req.body.id)
    course[i] = req.body
    res.json({"courses":course})
});

app.put('/api/students/', function(req, res){
    i = student.findIndex(students => students.id == req.body.id)
    student[i] = req.body
    res.json({"students":student})
});

app.delete('/api/students/', function(req, res){
    i = student.findIndex(students => students.id == req.body.id)
    student.splice(i,1)
    res.json({"students":student})
    
});

app.delete('/api/courses/', function(req, res){
    i = course.findIndex(courses => courses.id == req.body.id)
    course.splice(i,1)
    res.json({"courses":course})
    
});



const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`WHOOOOOO!!${port}`));
//app.listen(8000, ()=> console.log('almostDone'));