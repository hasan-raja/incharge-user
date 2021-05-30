require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

// const amqp = require("amqplib/callback_api");

// amqp.connect('amqps://dnglgbjp:yLAX0GOTNt-byRrc6IJeeU5ih9CR1HmC@beaver.rmq.cloudamqp.com/dnglgbjp', (error0, connection) => {
//   if (error0) {
//     throw error0;
//   }

//   connection.createChannel((error1, channel) => {
//     if (error1) {
//       throw error1;
//     }

    
    
    

    
    //get all employees
    app.get("/api/v1/employees", async (req, res) => {
      try {
        //const results = await db.query(`SELECT * FROM employees`);

        const employeeRatingsData = await db.query(
          "select * from employees left join (select employee_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by employee_id) reviews on employees.id = reviews.employee_id"
        );

        // console.log(results.rows.length);
        res.status(200).json({
          status: "success",
          results: employeeRatingsData.rows.length,
          data: {
            employees: employeeRatingsData.rows,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    //Get individual employees

    app.get("/api/v1/employees/:id", async (req, res) => {
      //onsole.log(req.params.id);
      try {
        const employee = await db.query(
          "select * from employees left join (select employee_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by employee_id) reviews on employees.id = reviews.employee_id WHERE id=$1",
          [req.params.id]
        );
        //console.log(results.rows);
        const reviews = await db.query(
          "SELECT * FROM reviews WHERE employee_id=$1",
          [req.params.id]
        );
        res.status(200).json({
          status: "sucess",
          data: {
            employee: employee.rows[0],
            reviews: reviews.rows,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    //add review
    app.post("/api/v1/employees/:id/addReview", async (req, res) => {
      try {
        const newReview = await db.query(
          "INSERT INTO reviews (employee_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *",
          [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        channel.sendToQueue('review_created', Buffer.from(JSON.stringify(newReview)))
        res.status(201).json({
          data: {
            review: newReview.rows[0],
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    const port = process.env.PORT || 4001;

    app.listen(port, () => {
      console.log(`server is up and listening on port ${port} `);
    });
//   });
// });
