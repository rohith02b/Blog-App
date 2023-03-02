import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getPosts = (req, res) => {
  const q =
    'SELECT p.id,p.title,p.img,u.username from posts p , users u where p.uid = u.id order by ID desc;';
  db.query(q, (err, data) => {
    if (err) return res.status(400).send(err);
    return res.send(data);
  });
};

export const getPost = (req, res) => {
  const values = [req.params.id];
  const q =
    'select p.title,p.desc,p.img,p.cat,u.username from posts p , users u where u.id=p.uid and p.id = (?); ';

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(data);
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const values = [req.body.title, req.body.desc, req.body.cat];
    const id = req.params.id;
    const q = 'Update posts set `title`=?,`desc`=?,`cat`=? where id = ? ;';

    db.query(q, [...values, id], (err, data) => {
      if (err) return res.status(400).send(err);

      return res.status(200).send(data);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const values = [req.params.id];
    const q = 'delete from posts where id = (?);';

    db.query(q, [values], (err, data) => {
      if (err) return res.status(400).send(err);

      return res.status(200).send(data);
    });
  });
};

export const createPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const values = [req.body.title, req.body.desc, req.body.cat];
    let id = 0;

    let username = req.body.username;
    let q = 'select id from users where username = (?);';

    db.query(q, [username], (err, data) => {
      if (err) {
        return res.status(409).send(err);
      }

      id = data[0].id;
      values.push(id);

      console.log(values);
      q = 'INSERT INTO posts (`title`,`desc`,`cat`,`uid`) values (?);';

      db.query(q, [values], (err, data) => {
        if (err) return res.status(400).send(err);

        return res.status(200).send(data);
      });

      return;
    });
  });
};
