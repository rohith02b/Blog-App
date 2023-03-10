import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
  const id = req.params.id;
  const q = 'select username,email from users where id = (?);';

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const getUserPosts = (req, res) => {
  const id = req.params.id;
  const q = 'select id,title,cat from posts where uid = (?);';

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const setUser = (req, res) => {
  const token = req.cookies.access_token;
  const id = req.params.id;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = 'update users set `username`=?,`email` = ? where id = ?;';
    const values = [req.body.username, req.body.email];

    db.query(q, [...values, id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};
