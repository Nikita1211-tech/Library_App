import {
  AddBook,
  Booklist,
  Bookdesc,
  upload,
  Deletebook,
  BookCategory,
  Addbookcategory,
  Showbookcategory,
  Addbooktype,
  Showbooktype,
  Books,
  Booktypes,
  Bookcategorydesc,
  Updatebookcategory,
  Booktypedesc,
  Updatebooktype,
  Deletebookcategory,
  Deletebooktype,
  Showcategoryimage,
  Showtypeimage,
} from "../controllers/adminController";

const express = require("express");
const {
  Login,
  Auth,
  Logout,
  Register,
  Reset,
  Otp,
  updatePassword,
  Verifyuser,
  Verifyotp,
  Saveuser,
  Resendotp,
  Saveadmin,
} = require("../controllers/authControllers");

const router = express.Router();
// Login routes
router.post("/login", Auth);
// router.get('/main', authenticateJWT, (req,res) => {
//     res.json({ message: 'This is a protected route!', user: req.user });
// })
// Auth routes
// router.post('/register',Register);
router.post("/verifyuser", Verifyuser);
router.post("/verifyotp", Verifyotp);
router.post("/resendotp", Resendotp);
router.post("/resetpassword", Reset);
router.post("/otp", Otp);
router.post("/saveuser", Saveuser);
router.post("/saveadmin", Saveadmin);
router.post("/addbook", upload.single("bookimg"), AddBook);
router.post("/updatepassword", updatePassword);
router.get("/logout", Logout);
// Dashboard routes
router.get("/books", Books);
router.get("/bookdescription/:book_id", Bookdesc);
router.post("/bookcategory", BookCategory);
router.post("/booktype", Booktypes);
router.post("/addbookcategory", upload.single("image"), Addbookcategory);
router.post("/addbooktype", upload.single("image"), Addbooktype);
router.get("/showbookcategory", Showbookcategory);
router.get("/showbooktype", Showbooktype);
router.get("/bookcategory", BookCategory);
router.get("/bookcategorydescription/:book_id", Bookcategorydesc);
router.get("/booktypedescription/:book_id", Booktypedesc);
router.get("/booklist", Booklist);
router.get("/categoryimage/:categoryName", Showcategoryimage);
router.get("/typeimage/:typeName", Showtypeimage);
// router.put('/updatebook/:book_id', upload.single('bookimg'), Updatebook);
router.put(
  "/updatebookcategory/:id",
  upload.single("image"),
  Updatebookcategory
);
router.put("/updatebooktype/:id", upload.single("image"), Updatebooktype);
router.delete("/deletebook/:book_id", Deletebook);
router.delete("/deletebookcategory/:book_id", Deletebookcategory);
router.delete("/deletebooktype/:book_id", Deletebooktype);

export default router;
