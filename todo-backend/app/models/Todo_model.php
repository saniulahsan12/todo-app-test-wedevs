<?php

class Todo_model
{
    private $table = 'todos';
    private $db;

    public function __construct()
    {
        $this->db = new Database;
    }

    public function get_all()
    {
        $this->db->query('SELECT * FROM ' . $this->table);
        return $this->db->result_set();
    }

    public function get_all_by_status($status)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE status=:status');
        $this->db->bind('status', $status);
        return $this->db->result_set();
    }

    public function get_by_id($id)
    {
        $this->db->query('SELECT * FROM ' . $this->table . ' WHERE id=:id');
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function insert($data)
    {
        $query = "INSERT INTO {$this->table} (description) VALUES (:description)";
        $this->db->query($query);
        $this->db->bind('description', $data['description']);
        $this->db->execute();
        return $this->db->last_insert_id();
    }

    public function delete($id)
    {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->execute();
        return $this->db->row_count();
    }

    public function deleteCompleted()
    {
        $query = "DELETE FROM {$this->table} WHERE status = 1";
        $this->db->query($query);
        $this->db->execute();
        return $this->db->row_count();
    }

    public function update($data)
    {
        $query = "UPDATE {$this->table} SET
				 	description=:description,
                    updated=NOW(),
                    status=:status
				  WHERE id = :id";

        $this->db->query($query);
        $this->db->bind('id', (int)$data['id']);
        $this->db->bind('description', $data['description']);
        $this->db->bind('status', $data['status']);
        $this->db->execute();
        return $this->db->row_count();
    }

    public function search()
    {
        $keyword = $_POST['keyword'];
        $query = "SELECT * FROM {$this->table} WHERE description LIKE :keyword";
        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");

        return $this->db->result_set();
    }
}
