const { pool } = require("../utils/lib/postgres");

class UserModel {
  static async create(userData) {
    const query = `
      INSERT INTO users (
        name, email, password_hash, board, field, standard, 
        date_of_birth, age, created_at, updated_at
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING id, name, email, board, field, standard, date_of_birth, age`;

    const values = [
      userData.name,
      userData.email,
      userData.password_hash,
      userData.board,
      userData.field,
      userData.standard,
      userData.date_of_birth,
      userData.age
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = `
      SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async update(id, userData) {
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(userData)) {
      if (value !== undefined && key !== "id") {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    values.push(id);

    const query = `
      UPDATE users 
      SET ${updateFields.join(", ")}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING id, name, email, board, field, standard, date_of_birth, age`;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = UserModel;
