import { database } from "../db/database.js";

export const getAllTodosCtrl = async (req, res) => {
  const user = req.user;
  const todos = database.todos.filter((todo) => todo.owner === user.id);

  res.json({ todos });
};

export const updateTodosCtrl = async (req, res) => {
  const { ids, updates } = req.body; // ids es un array de IDs de tareas y updates es un array de objetos con title y description
  const userId = req.user.id; // ID del usuario autenticado

  try {
    if (!Array.isArray(ids) || !Array.isArray(updates) || ids.length !== updates.length) {
      return res.status(400).json({ message: "Datos de entrada inválidos" });
    }

    // Verificar que las tareas existen y pertenecen al usuario autenticado
    const userTodos = database.todos.filter(todo => todo.owner === userId);
    const userTodoIds = userTodos.map(todo => todo.id);

    const tasksToUpdate = ids.filter(id => userTodoIds.includes(id));
    
    if (tasksToUpdate.length !== ids.length) {
      return res.status(403).json({ message: "No tienes permiso para editar algunas de estas tareas" });
    }

    // Actualizar las tareas
    userTodos.forEach(todo => {
      const updateIndex = ids.indexOf(todo.id);
      if (updateIndex !== -1) {
        const { title, description } = updates[updateIndex];
        todo.title = title;
        todo.description = description;
      }
    });

    res.json({ message: "Tareas actualizadas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar las tareas", error });
  }
};

export const deleteTodosCtrl = async (req, res) => {
  const { ids } = req.body; // ids es un array de IDs de tareas
  const userId = req.user.id; // ID del usuario autenticado

  try {
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "Datos de entrada inválidos" });
    }

    // Verificar que las tareas existen y pertenecen al usuario autenticado
    const userTodos = database.todos.filter(todo => todo.owner === userId);
    const userTodoIds = userTodos.map(todo => todo.id);

    const tasksToDelete = ids.filter(id => userTodoIds.includes(id));
    
    if (tasksToDelete.length !== ids.length) {
      return res.status(403).json({ message: "No tienes permiso para eliminar algunas de estas tareas" });
    }

    // Eliminar las tareas
    database.todos = database.todos.filter(todo => !ids.includes(todo.id));

    res.json({ message: "Tareas eliminadas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar las tareas", error });
  }
};
