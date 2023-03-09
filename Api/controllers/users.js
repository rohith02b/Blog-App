import { db } from '../db.js';

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
  const q = 'select title,cat from posts where uid = (?);';

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const setUser = (req, res) => {
  res.json('hi');
};
