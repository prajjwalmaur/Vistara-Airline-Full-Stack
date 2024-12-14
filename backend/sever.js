const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const { application } = require("express");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "python",
  database: "airline",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Helper function to format date
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

// Recursive function to format dates in deeply nested structures
const formatDatesInResult = (data) => {
  if (Array.isArray(data)) {
    return data.map(formatDatesInResult);
  } else if (data && typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Date) {
        data[key] = formatDate(data[key]);
      } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
        data[key] = formatDatesInResult(data[key]);
      }
    });
    return data;
  }
  return data;
};

//select
app.get("/api/get", (req, res) => {
  const sqlGet = "select * from passengers;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/airplane/api/get", (req, res) => {
  const sqlGet = "select * from planes;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/flightStatus/api/get", (req, res) => {
  const sqlGet = "select flight_id , status from flights;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/airport/api/get", (req, res) => {
  const sqlGet = "select * from airports;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/gates/api/get", (req, res) => {
  const sqlGet = "select * from gate;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/reviews/api/get", (req, res) => {
  const sqlGet = "select * from reviews;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/schedule/api/get", (req, res) => {
  const sqlGet = "select * from flights;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/flight/api/get", (req, res) => {
  const sqlGet = "select * from flights;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/ticket/api/get", (req, res) => {
  const sqlGet = "select * from bookings;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/booking/api/get", (req, res) => {
  const sqlGet = "select * from bookings;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

//insert
app.post("/api/post", (req, res) => {
  const { passenger_id, first_name, last_name, email, phone_number, passport_no, dateofbirth } = req.body;
  const sqlInsert = "insert into passengers values (?,?,?,?,?,?,?,NULL)";
  db.query(
    sqlInsert,
    [passenger_id, first_name, last_name, email, phone_number, passport_no, dateofbirth],
    (err, result) => {
      if (err) res.send({ err: err });
    }
  );
});

app.post("/airplane/api/post", (req, res) => {
  const { plane_id, model, capacity, manufacturer } = req.body;
  const sqlInsert = "insert into planes values (?,?,?,?)";
  db.query(
    sqlInsert,
    [plane_id, model, capacity, manufacturer],
    (err, result) => {
      if (err) res.send({ err: err });
    }
  );
});

app.post("/schedule/api/post", (req, res) => {
  const { schedule_id, departure_time, arrival_time, duration_time } = req.body;
  const sqlInsert =
    "upate table flights set departure_time = (?) , arrival_time = (?) where flight_id = (?)";
  db.query(
    sqlInsert,
    [departure_time, arrival_time, duration_time, schedule_id],
    (err, result) => {
      if (err) res.send({ err: err });
    }
  );
});

app.post("/flight/api/post", (req, res) => {
  const {
    flight_id,
    flight_number,
    departure_time,
    arrival_time,
    origin,
    destination,
    plane_id,
    status,
  } = req.body;
  const sqlInsert = "insert into flights values (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      flight_id,
      flight_number,
      departure_time,
      arrival_time,
      origin,
      destination,
      plane_id,
      status,
    ],
    (err, result) => {
      if (err) res.send({ err: err });
    }
  );
});

//delete
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from passengers where passenger_id=?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) res.send({ err: err });
  });
});

app.delete("/airplane/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from planes where plane_id=?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) res.send({ err: err });
  });
});

app.delete("/schedule/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from flights where flight_id=?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) res.send({ err: err });
  });
});

app.delete("/flight/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "delete from flights where flight_number=?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) res.send({ err: err });
  });
});

//view
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from passengers where passenger_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/airplane/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from planes where plane_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/flightStatus/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select flight_id,status from flights where flight_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/airport/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from airports where airport_code=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/gates/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from gates where gate_no=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/reviews/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from review where passenger_id=?;";
  db.query(sqlGet, [id], (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/schedule/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "select flight_id,departure_time,arrival_time from flights where flight_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/flight/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select * from flights where flight_number=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

//update
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { passenger_id, first_name, last_name, phone_number, email, passport_no, dateofbirth } = req.body;
  const sqlUpdate =
    "update passengers set passenger_id=?,first_name=?,last_name=?,email=?,phone_number=?,passport_no=?, dateofbirth =? where passenger_id=?";
  db.query(
    sqlUpdate,
    [passenger_id, first_name, last_name, phone_number, email, passport_no, dateofbirth,id],
    (err, result) => {
      if (err) res.send({ err: err });
      else res.send(formatDatesInResult(result));
    }
  );
});

app.put("/airplane/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { plane_id, model, capacity, manufacturer } = req.body;
  const sqlUpdate =
    "update planes set plane_id=?,model=?,capacity=?,manufacturer=? where plane_id=?";
  db.query(
    sqlUpdate,
    [plane_id, model, capacity, manufacturer, id],
    (err, result) => {
      if (err) res.send({ err: err });
      else res.send(formatDatesInResult(result));
    }
  );
});

app.put("/schedule/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { flight_id, departure_time, arrival_time } = req.body;
  const sqlUpdate =
    "update flights set flight_id=?,departure_time=?,arrival_time=? where flight_id=?";
  db.query(
    sqlUpdate,
    [flight_id, departure_time, arrival_time, id],
    (err, result) => {
      if (err) res.send({ err: err });
      else res.send(formatDatesInResult(result));
    }
  );
});

app.put("/ticket/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { ticket_id, seat_no, airport_code } = req.body;
  const sqlUpdate =
    "update bookings set booking_id=?,flight_id=?,seat_number=? where booking_id=?";
  db.query(sqlUpdate, [ticket_id, airport_code, seat_no, id], (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

//login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "select * from admin where username=? and password=?",
    [username, password],
    (err, result) => {
      if (err) res.send({ err: err });
      if (result.length > 0) res.send(formatDatesInResult(result));
      else {
        res.send({ msg: "Invalid Admin Login" });
      }
    }
  );
});

app.post("/customerlogin", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  db.query(
    "select * from passengers where email=? and password=?",
    [username, password],
    (err, result) => {
      if (err) res.send({ err: err });
      if (result.length > 0) res.send(formatDatesInResult(result));
      else {
        res.send({ msg: "Invalid Customer Login" });
      }
    }
  );
});

app.post("/getcustomerlogin", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  db.query(
    "select passenger_id from passengers where email=? and password=?",
    [username, password],
    (err, result) => {
      if (err) res.send({ err: err });
      if (result.length > 0) res.send(formatDatesInResult(result));
      else {
        res.send({ msg: "Invalid Customer Login" });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone = req.body.phone;
  const email = req.body.email;
  const passport = req.body.passport;
  const dob = req.body.dob;
  const password = req.body.password;
  db.query(
    "insert into passengers (first_name,last_name,email,phone_number,passport_no, dateofbirth,password) values(?,?,?,?,?,?,?);",
    [fname, lname, email, phone, passport, dob, password],
    (err, result) => {
      if (err) {
        console.log(err);
        
        res.send({ err: "error" });}
    }
  );
});

app.get("/CustomerPanel/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "select first_name from passengers where passenger_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.post("/BookTicket", (req, res) => {
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const departureDate = req.body.departureDate;
  const returnDate = req.body.returnDate;
  const classs = req.body.class;
  const price = req.body.price;
  const sqlInsert =
    "insert into FlightBooking (departure,arrival,departureDate,returnDate,class,price) values (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [departure, arrival, departureDate, returnDate, classs, price],
    (err, result) => {
      if (err) res.send({ err: err });
    }
  );
});

app.get("/SearchFlights", (req, res) => {
  const sqlGet =
    "select fb_id,departure,arrival,departureDate, returnDate, class,price from FlightBooking;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.delete("/removeSearch", (req, res) => {
  const sqlRemove = "delete from FlightBooking";
  db.query(sqlRemove, (err, result) => {
    if (err) res.send({ err: err });
  });
});

app.post("/AvailableFlights", (req, res) => {
  const departureDate = req.body.departureDate;
  const returnDate = req.body.returnDate;
  const departure = req.body.departure;
  const arrival = req.body.arrival;

  const fares = req.body.fares;
  console.log(departureDate);
  // console.log(returnDate);
  console.log(fares.slice(2, 6));
  console.log(departure);
  console.log(arrival);
  

  const sqlGet = `
   SELECT 
    f.flight_id, 
    f.flight_number, 
    f.departure_time, 
    f.arrival_time, 
    f.origin, 
    f.destination, 
    f.status,
    a_origin.airport_name AS origin_airport_name,
    a_dest.airport_name AS destination_airport_name,
    a_origin.city AS origin_city,
    a_dest.city AS destination_city,
    p.model AS plane_model,
    p.capacity AS plane_capacity,
    p.manufacturer AS plane_manufacturer
FROM 
    flights f
JOIN 
    airports a_origin ON f.origin = a_origin.airport_code
JOIN 
    airports a_dest ON f.destination = a_dest.airport_code
JOIN 
    planes p ON f.plane_id = p.plane_id
WHERE 
    a_origin.airport_name = ? 
    AND a_dest.airport_name = ? 
    AND DATE(f.departure_time) = ?

  `;
  db.query(sqlGet, [departure,arrival,departureDate], (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.post("/UpdateFlightBooking", (req, res) => {
  const id = req.body.id;
  console.log(id);
  
  const sqlUpdate =
    "update FlightBooking set flight_no=(select f.flight_number from Flight f where f.flight_id=?) where flight_no is null;";
  db.query(sqlUpdate, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/invoice/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "select first_name,last_name from passengers where passenger_id=?;";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/invoicefares", (req, res) => {
  const sqlGet = "select flight_no,departure,price,class from FlightBooking;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

// Helper function to generate a unique random booking ID
function generateRandomBookingID() {
  return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
}

function generateRandomSeat(capacity) {
  const seatNumber =
    "A" + (Math.floor(Math.random() * capacity) + 1).toString().padStart(2, "0");
  return seatNumber;
}

function generateRandomPaymentID() {
  return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
}

function generateRandomTicketNumber() {
  return "TKT" + Math.floor(100000 + Math.random() * 900000); // Random 6-digit number prefixed with "TKT"
}

app.post("/invoiceconfirm", (req, res) => {
  const flight_id = req.body.flight_id;
  const departure = req.body.departure;
  const passenger_id = req.body.passenger_id;
  let price = req.body.price;
  price = price.split(" ")[1];
  const clas = req.body.class;

  console.log(flight_id);
  console.log(departure);
  console.log(price);
  

  const getFlightDetailsQuery = `
    SELECT p.capacity, f.departure_time
    FROM Planes p
    JOIN Flights f ON f.plane_id = p.plane_id
    WHERE f.flight_id = ?
  `;

  db.query(getFlightDetailsQuery, [flight_id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      console.log("No plane found for the given flight_id.");
      return res.status(404).json({ error: "Flight not found" });
    }

    const capacity = results[0].capacity;
    const seatNumber = generateRandomSeat(capacity);
    const booking_id = generateRandomBookingID();
    const payment_id = generateRandomPaymentID();
    const departureTime = results[0].departure_time;

    
    // Step 1: Insert into Bookings table without the payment_id
    const bookingQuery = `
      INSERT INTO Bookings (booking_id, passenger_id, flight_id, booking_date, seat_number, booking_status)
      VALUES (?, ?, ?, NOW(), ?, 'Confirmed')
    `;
    db.query(
      bookingQuery,
      [booking_id, passenger_id, flight_id, seatNumber],
      (err, bookingResult) => {
        if (err) throw err;
        console.log("Booking created with booking_id:", booking_id);

        // Step 2: Insert into Payments table
        const paymentQuery = `
          INSERT INTO Payments (payment_id, booking_id, payment_method, amount, payment_date)
          VALUES (?, ?, 'Credit Card', ?, NOW())
        `;
        db.query(
          paymentQuery,
          [payment_id, booking_id, price],
          (err, paymentResult) => {
            if (err) throw err;
            console.log("Payment created with payment_id:", payment_id);

            // Step 3: Update Bookings table with payment_id
            const updateBookingQuery = `
              UPDATE Bookings SET payment_id = ? WHERE booking_id = ?
            `;
            db.query(updateBookingQuery, [payment_id, booking_id], (err, updateResult) => {
              if (err) throw err;
              console.log("Booking updated with payment_id:", payment_id);

              // Step 4: Insert into Tickets table
              const ticketNumber = generateRandomTicketNumber();
              const ticketQuery = `
                INSERT INTO Tickets (booking_id, ticket_number, seat_class, seat_number, issued_date)
                VALUES (?, ?, ?, ?, ?)
              `;
              db.query(
                ticketQuery,
                [booking_id, ticketNumber, clas, seatNumber, departureTime],
                (err, ticketResult) => {
                  if (err) throw err;
                  console.log("Ticket created with ticket_id:", ticketResult.insertId);
                  res.status(200).json({
                    booking_id,
                    payment_id,
                    ticketNumber,
                    seatNumber,
                    departureTime,
                  });
                }
              );
            });
          }
        );
      }
    );
  });
});

app.get("/showPass", (req, res) => {
  const { passenger_id, flight_id } = req.query;

  if (!passenger_id || !flight_id) {
    return res.status(400).json({ error: "Missing passenger_id or flight_id" });
  }

  const query = `
    SELECT 
        p.payment_id, t.ticket_number, t.seat_class, t.seat_number,
        f.flight_number, f.departure_time, f.arrival_time,
        a_origin.airport_name AS origin_airport, a_dest.airport_name AS destination_airport,
        a_origin.city AS origin_city, a_dest.city AS destination_city,
        a_origin.country AS origin_country, a_dest.country AS destination_country,
        ps.first_name AS passenger_first_name, ps.last_name AS passenger_last_name
    FROM Payments p
    JOIN Bookings bk ON p.booking_id = bk.booking_id
    JOIN Tickets t ON t.booking_id = bk.booking_id
    JOIN Passengers ps ON bk.passenger_id = ps.passenger_id
    JOIN Flights f ON bk.flight_id = f.flight_id
    JOIN Airports a_origin ON f.origin = a_origin.airport_code
    JOIN Airports a_dest ON f.destination = a_dest.airport_code
    WHERE ps.passenger_id = ? AND f.flight_id = ?;
  `;

  db.query(query, [passenger_id, flight_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No data found for the provided passenger and flight" });
    }
    res.json(results[0]);
  });
});

app.get('/api/getTickets/:passenger_id', (req, res) => {
  const { passenger_id } = req.params;
  
  const query = `
    SELECT 
      p.payment_id,
      t.ticket_number,
      t.seat_class,
      t.seat_number,
      f.flight_number,
      f.departure_time,
      f.arrival_time,
      a_origin.airport_name AS origin_airport,
      a_origin.city AS origin_city,
      a_origin.country AS origin_country,
      a_dest.airport_name AS destination_airport,
      a_dest.city AS destination_city,
      a_dest.country AS destination_country,
      pl.model AS plane_model,
      pl.manufacturer AS plane_manufacturer,
      pl.capacity AS plane_capacity,
      ps.passenger_id,
      ps.first_name AS passenger_first_name,
      ps.last_name AS passenger_last_name,
      ps.email AS passenger_email,
      p.amount AS payment_amount,
      p.payment_method,
      bk.booking_status
    FROM 
      Payments p
    JOIN Bookings bk ON p.booking_id = bk.booking_id
    JOIN Tickets t ON t.booking_id = bk.booking_id
    JOIN Passengers ps ON bk.passenger_id = ps.passenger_id
    JOIN Flights f ON bk.flight_id = f.flight_id
    JOIN Airports a_origin ON f.origin = a_origin.airport_code
    JOIN Airports a_dest ON f.destination = a_dest.airport_code
    JOIN Planes pl ON f.plane_id = pl.plane_id
    WHERE 
      ps.passenger_id = ?
  `;
  
  db.query(query, [passenger_id], (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No tickets found for the given passenger" });
    }
    res.json(results);
  });
});

app.post("/addreview/:id", (req, res) => {
  const id = req.body.id;
  const review = req.body.review;
  console.log(id, review);
  const sqlInsert = "insert into reviews values(?,?);";
  db.query(sqlInsert, [id, review], (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/getreview", (req, res) => {
  const sqlGet =
    "select c.first_name,c.last_name,cr.review from reviews cr inner join passengers c on c.passenger_id=cr.passenger_id;;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get("/getstats", (req, res) => {
  const sqlGet =
    "select count(passenger_id) as countt,sum(amount) as summ from bookings as b , payments as p where b.payment_id = p.payment_id;";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(formatDatesInResult(result));
  });
});

app.get('/crew_assignments/api/get', (req, res) => {
  const sqlGet = `
    SELECT ca.assignment_id, ca.flight_id, ca.crew_id,
           c.first_name, c.last_name, c.role,
           f.flight_number
    FROM crew_assignments ca
    JOIN crew c ON ca.crew_id = c.crew_id
    JOIN flights f ON ca.flight_id = f.flight_id;
  `;
  db.query(sqlGet, (err, result) => {
    if (err) res.status(500).send({ error: err.message });
    else res.send(result);
  });
});

app.get('/crew_assignments/api/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = `
    SELECT ca.assignment_id, ca.flight_id, ca.crew_id,
           c.first_name, c.last_name, c.role,
           f.flight_number
    FROM crew_assignments ca
    JOIN crew c ON ca.crew_id = c.crew_id
    JOIN flights f ON ca.flight_id = f.flight_id
    WHERE ca.assignment_id = ?;
  `;
  db.query(sqlGet, [id], (err, result) => {
    if (err) res.status(500).send({ error: err.message });
    else res.send(result);
  });
});

// Update or create a crew assignment
app.post('/crew_assignments/api/save', (req, res) => {
  const { assignment_id, flight_id, crew_id } = req.body;
  if (assignment_id) {
    const sqlUpdate = `UPDATE crew_assignments SET flight_id = ?, crew_id = ? WHERE assignment_id = ?`;
    db.query(sqlUpdate, [flight_id, crew_id, assignment_id], (err, result) => {
      if (err) res.status(500).send({ error: err.message });
      else res.send({ message: 'Assignment updated successfully' });
    });
  } else {
    const sqlInsert = `INSERT INTO crew_assignments (flight_id, crew_id) VALUES (?, ?)`;
    db.query(sqlInsert, [flight_id, crew_id], (err, result) => {
      if (err) res.status(500).send({ error: err.message });
      else res.send({ message: 'Assignment created successfully' });
    });
  }
});

// Add a new crew member
app.post('/crew/api/add', (req, res) => {
  const { crew_id, first_name, last_name, role } = req.body;
  const sqlInsert = 'INSERT INTO crew (crew_id, first_name, last_name, role) VALUES (?, ?, ?, ?)';
  db.query(sqlInsert, [crew_id, first_name, last_name, role], (err, result) => {
    if (err) res.status(500).send({ error: err.message });
    else res.send({ message: 'Crew member added successfully' });
  });
});

app.get('/crew/api/get', (req, res) => {
  const sqlGet = 'SELECT * FROM crew';
  db.query(sqlGet, (err, result) => {
    if (err) res.status(500).send({ error: err.message });
    else res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});
