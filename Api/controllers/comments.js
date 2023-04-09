import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getComments = (req, res) => {
  const id = req.params.id;

  const q =
    'select c.id,c.comment,c.uid,u.username from comments c,users u where c.uid = u.id and c.pid = ? order by ID desc; ';

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const setComments = (req, res) => {
  const token = req.cookies.access_token;
  const values = [req.body.comment, req.body.uid, req.params.id];
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = 'insert into comments (`comment`,`uid`,`pid`) values (?);';
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};
