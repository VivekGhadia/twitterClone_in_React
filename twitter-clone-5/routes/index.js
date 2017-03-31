const express = require('express');
const DB = require('../helpers/db');

const router = express.Router();

const path = require('path');

const multer = require('multer');

const upload = multer({ dest: path.resolve(__dirname, '../public/images/profile/') });

const uploadtweet = multer({ dest: path.resolve(__dirname, '../public/images/tweetimage/') });
// GET: /

router.get('/', (req, res, next) => {
  // Constuct and run a simple query
  const query = DB.builder()
    .select()
    .function('NOW()')
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    res.render('index', {
       // title: `Time from the database is ${results.rows[0].now}`,
    });
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', upload.single('file'), (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const fullname = req.body.userdata.name;
  const emailid = req.body.userdata.emailid;
  const password = req.body.userdata.password;
  const image =  req.body.userdata.file;
  const securityquestion = req.body.userdata.question;
  const securityanswer = req.body.userdata.answer;
  // const fullname = req.sanitize('fullname').trim();
  // const emailid = req.sanitize('emailid').trim();
  // const password = req.sanitize('password').trim();
  // const securityquestion = req.sanitize('question').trim();
  // const securityanswer = req.sanitize('answer').trim();

  // req.checkBody('fullname', 'Username is required').notEmpty();
  // if (emailid !== '') {
  //   req.checkBody('emailid', 'Email is not valid').isEmail();
  // } else {
  //   req.checkBody('emailid', 'Email is required').notEmpty();
  // }
  // req.checkBody('question', 'question is required').notEmpty();
  // req.checkBody('answer', 'answer is required').notEmpty();

  // const errors = req.validationErrors();
  // if (errors) {
  //   res.render('register', {
  //     errors,
  //   });
  // } else {
  //   let photo = '';
  //   if (req.file) {
  //     photo = req.file.filename;
  //   } else {
  //     photo = 'default.png';
  //   }
    console.log("query will fire");
    const query = DB.builder()
      .insert()
      .into('tbl_register')
      .set('fullname', fullname)
      .set('emailid', emailid)
      .set('password', password)
      .set('image', image)
      .set('securityquestion', securityquestion)
      .set('securityanswer', securityanswer)
      .toParam();
    DB.executeQuery(query, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  });





router.post('/login', (req, res, next) => {
  console.log("POST.Login called"+ '********')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const session = req.session;
  const emailid = req.body.userdata.emailid;
  const password = req.body.userdata.password;


  const query = DB.builder()
    .select()
    .from('tbl_register')
    .where('emailid = ? AND password = ?', emailid, password)
    .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
    }
    console.log("=======",query)
    if (results.rowCount) {
      console.log(results.rowCount);
      session.emailid = emailid;
      session.userid = results.rows[0].id;
      console.log(session.id, '@@@@@@@@@@')
      // res.redirect('header');
    } /*else {
      res.render('login');
    }*/
    let data ={
      userid: session.userid,
    }
    res.end(JSON.stringify(data));
  });
});

router.get('/logout', (req, res) => {
  console.log(session.id,'&&&&&&&&&&&&')
  req.session.destroy((err) => {
     console.log("logoutttttt")
     console.log(session.emailid, '$$$$$$$$$$$');
  });
});

router.get('/index', (req, res) => {
  res.render('index');
});

router.get('/header/:id', (req, res, next) => {
  console.log('HEADER GET called' + '**************')
  let query;
  let userid= req.params.id;
  query = DB.builder()
    .select()
    .field('fullname')
    .field('t_tweetText')
    .field('image')
    .field('t_likeCount')
    .field('t.*')
    .from('tbl_register', 'r')
    .join('tbl_tweet', 't', 't.t_userid = r.id')
    .where(DB.builder().expr()
      .or('t.t_userid IN ?', DB.builder()
        .select()
        .field('f_followerid')
        .from('tbl_follower')
        .where('f_userid = ?', userid))
      .or('t.t_userid= ?', userid))
    .order('t_time', false);
  // console.log(query.toString());
  DB.executeQuery(query.toParam(), (error, tweets) => {
    if (error) {
      next(error);
    }
    query = DB.builder()
        .select()
        .from('tbl_register')
        .where('id != ?', userid)
        .where('id NOT IN ?',
        DB.builder()
          .select()
          .field('f_followerid')
          .from('tbl_follower')
          .where('f_userid = ?', userid))
          .order('RANDOM()')
          .limit(3)
          .toParam();
    DB.executeQuery(query, (error1, follow) => {
      if (error1) {
        next(error1);
        return;
      }

    query = DB.builder()
      .select()
      .from('tbl_register', 'r')
      .field('fullname')
      .field('id')
      .field('image')
      .where('id = ?', userid)
      .toParam();
      // console.log(query);

      DB.executeQuery(query, (error2, username) => {
        if (error2) {
          next(error2);
          return;
        }
    query = DB.builder()
      .select()
      .from('tbl_follower', 'r')
      .where('f_userid = ?', userid)
      .toParam();

    console.log("//////",userid);
      DB.executeQuery(query, (error2, count) => {
        if (error2) {
          next(error2);
          return;
        }

    query = DB.builder()
      .select()
      .from('tbl_register', 'r')
      .where('id = ?', userid)
      .toParam();

    console.log("//////",userid);
      DB.executeQuery(query, (error2, count1) => {
        if (error2) {
          next(error2);
          return;
        }


        let data = {
          tweets: tweets.rows,
          follow: follow.rows,
          username: username.rows,
          count: count.rows.length,
          count1: count1.rows.length,
        }
        res.end(JSON.stringify(data));
    });
        });
      });
    });
  });
});

router.post('/header', uploadtweet.single('file'), (req, res, next) => {
  let filename = '';
  if (req.file) {
    filename = req.file.filename;
  } else {
    filename = '';
  }
  const query = DB.builder()
    .insert()
    .into('tbl_tweet')
    .set('t_tweetText', req.body.comment)
    .set('t_likeCount', '0')
    .set('t_time', 'now()')
    .set('t_image', filename)
    .set('t_userid', req.session.userid)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    res.redirect('/header');
  });
});


router.get('/profile', (req, res, next) => {
  let query;
  const session = req.session;
  if (req.session.emailid) {
    query = DB.builder()
      .select()
      .field('fullname')
      .field('t_tweetText')
      .field('t_time')
      .field('image')
      .field('t_image')
      .from('tbl_register', 'r')
      .join(DB.builder().select().from('tbl_tweet'), 't', 't.t_userid = r.id')
      .where('emailid = ?', req.session.emailid)
      .order('t_time', false)
      .toParam();

    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
      }
      query = DB.builder()
        .select()
        .field('fullname')
        .field('f_followerid')
        .field('f_id')
        .field('image')
        .from('tbl_register', 'r')
        .join(DB.builder().select().from('tbl_follower'), 'f', 'r.id = f.f_followerid')
        .where('r.id != ?', session.userid)
        .toParam();
      DB.executeQuery(query, (error1, follow) => {
        if (error1) {
          next(error1);
          return;
        }
        query = DB.builder()
          .select()
          .from('tbl_register', 'r')
          .field('fullname')
          .field('image')
          .where('id = ?', req.session.userid)
          .toParam();
        DB.executeQuery(query, (error2, username) => {
          if (error2) {
            next(error2);
            return;
          }
          res.render('profile', {
            res: results.rows,
            follow: follow.rows,
            username: username.rows,
          });
        });
      });
    });
  } else {
    res.render('login');
  }
});

router.post('/tweet', (req, res, next) => {
  const session = req.session;
  const emailid = req.body.data.emailid;
  let userid = req.body.data.data.username[0].id;
  console.log("aaaaaaa", userid);
  const tweetText = req.body.data.tweet;
  console.log("/////////////", tweetText);
  const query = DB.builder()
    .insert()
    .into('tbl_tweet')
    .set('t_tweetText', req.body.data.tweet)
    .set('t_time', 'now()')
    .set('t_userid', userid)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    let data = {
      id: userid,
    }
    res.end(JSON.stringify(data));
  });
});


router.post('/profile', (req, res, next) => {
  const query = DB.builder()
    .insert()
      .into('tbl_tweet')
      .set('t_tweetText', req.body.comment)
      .set('t_likeCount', '0')
      .set('t_time', 'now()')
      .set('t_userid', req.session.userid)
      .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    res.redirect('/profile');
  });
});

router.post('/follow', (req, res, next) => {
  const session = req.session;
  const query = DB.builder()
    .insert()
    .into('tbl_follower')
    .set('f_userid', session.userid)
    .set('f_followerid', req.body.myfollow)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    res.redirect('/header');
  });
});

router.post('/unfollow', (req, res, next) => {
  const query = DB.builder()
      .delete()
      .from('tbl_follower')
      .where('f_followerid=?', req.body.myfollow)
      .toParam();

  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
    }
    res.redirect('/profile');
  });
});

router.get('/updateprofile/:userid', (req, res, next) => {
  const session = req.session;
  const query = DB.builder()
    .select()
    .from('tbl_register')
    .where('emailid = ? ', session.emailid)
    .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
    }
    res.render('updateprofile', { res: results.rows });
  });
});

router.post('/updateprofile', upload.single('file'), (req, res) => {
  console.log('updateprofile called' + '%%%%%%%%%%%%%%')
  var session = req.session;
  console.log(session.emailid, '############')
  console.log('update profile called' + '/////////*/*/*/*/*/')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const query = DB.builder()
    .update()
      .table('tbl_register')
      .set('fullname', req.body.userdata.fullname)
      .set('emailid', req.body.userdata.emailid)
      .set('password', req.body.userdata.password)
      .where('emailid = ?', 'vivek@improwised.com')
      .toParam();
      console.log(query);
  DB.executeQuery(query, (error, next) => {
    if (error) {
      next(error);
    }
  });
  // return res.redirect('updateprofile');
});


router.get('/profilepictureupload', (req, res, next) => {
  const session = req.session;
  if (req.session.emailid) {
    const query = DB.builder()
      .select()
      .field('image')
      .from('tbl_register')
      .where('emailid = ?', session.emailid)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
      }
      res.render('updateprofile', { res: results.rows });
    });
  }
  res.render('login');
});

router.post('/profilepictureupload', upload.single('file'), (req, res) => {
  /*const session = req.session;
  if (req.session.emailid) {
    let photo = ''; = req.file.filename;
    if (req.file) {
      photo = req.file.filename;
    } else {
      photo = 'default.png';
    }*/
    const query = DB.builder()
      .update()
      .table('tbl_register')
      .set('image', photo)
      .where('emailid = ?', 'vivek@vivek.com')
      .toParam();
    DB.executeQuery(query, (error, next) => {
      if (error) {
        next(error);
      }
    });
    /*res.redirect('updateprofile');
  } else {
    res.render('login');
  }*/
});

router.get('/deleteaccount', (req, res, next) => {
  const session = req.session;
  if (req.session.emailid) {
    const query = DB.builder()
      .delete()
      .from('tbl_register')
      .where('emailid = ?', session.emailid)
      .toParam();
    DB.executeQuery(query, (error) => {
      if (error) {
        next(error);
      }
      res.render('login');
    });
  }
});

router.get('/resetpassword', (req, res) => {
  res.render('resetpassword');
});
router.get('/getpassword', (req, res) => {
  res.render('getpassword');
});

router.post('/resetpassword', (req, res, next) => {
  console.log('Reset password called' + '.....................')
  const query = DB.builder()
    .select()
    .field('password')
    .from('tbl_register')
    .where('emailid = ?', req.body.userdata.emailid)
    .where('securityquestion = ?', req.body.userdata.question)
    .where('securityanswer = ?', req.body.userdata.answer)
    .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
    }
    console.log(results, 'abcdefghi');
    res.render('getpassword', { res: results.rows });
  });
});

module.exports = router;
