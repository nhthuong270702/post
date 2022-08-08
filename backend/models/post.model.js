const sql = require('./db.js');

//constructor
const Post = function (post) {
    this.title = post.title;
    this.content = post.content;
    this.author = post.author;
};

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Post: ", { ...newPost });
        result(null, { ...newPost });
    });
};

Post.findById = (id, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found post: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not found" }, null);
    });
};

Post.getAll = result => {
    sql.query("SELECT * FROM posts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("postss: ", res);
        result(null, res);
    });
};
Post.updateById = (id, post, result) => {
    sql.query(
        `UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ${id}`,
        [post.title, post.content, post.author],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found employee with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated post: ", { ...post });
            result(null, { ...post });
        }
    );
};

Post.remove = (id, result) => {
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found employee with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted post with id: ", id);
        result(null, res);
    });
};

module.exports = Post;