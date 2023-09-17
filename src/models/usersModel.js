import { pool } from "./dbConnection.js";

const createUser = async ({ firstName, lastName, address, phoneNumber }) => {
  const query = {
    text: `
        INSERT INTO "YUVAL_GINOSAR".users (first_name, last_name, address, phone_number)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
    values: [firstName, lastName, address, phoneNumber],
  };

  const client = await pool.connect();
  try {
    const result = await client.query(query);
  } catch (error) {
    console.error("Error inserting new row:", error);
  } finally {
    client.release();
  }
};

const addHobby = async ({ userId, hobby }) => {
  const query = {
    text: `
      INSERT INTO "YUVAL_GINOSAR".hobbies (user_id, hobby)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [userId, hobby],
  };

  const client = await pool.connect();
  try {
    const result = await client.query(query);
    console.log("New hobby inserted:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting new hobby:", error);
  } finally {
    client.release();
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await pool.query('SELECT * FROM "YUVAL_GINOSAR".users');
    return allUsers.rows;
  } catch (error) {
    throw error;
  }
};

const getAllUsersAndHobbies = async () => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.address,
        u.phone_number,
        json_agg(h.hobby) AS hobbies
      FROM
        "YUVAL_GINOSAR".users u
      LEFT JOIN
        "YUVAL_GINOSAR".hobbies h
      ON
        u.id = h.user_id
      GROUP BY
        u.id, u.first_name, u.last_name, u.address, u.phone_number;
    `;

    const result = await client.query(query);
    client.release();

    return result.rows;
  } catch (error) {
    throw error;
  }
};

async function deleteUserAndHobbies(userId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const deleteHobbiesQuery = `
      DELETE FROM "YUVAL_GINOSAR".hobbies
      WHERE user_id = $1
    `;
    await client.query(deleteHobbiesQuery, [userId]);

    const deleteUserQuery = `
      DELETE FROM "YUVAL_GINOSAR".users
      WHERE id = $1
    `;
    await client.query(deleteUserQuery, [userId]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export default {
  createUser,
  getAllUsers,
  deleteUserAndHobbies,
  addHobby,
  getAllUsersAndHobbies,
};
