import { useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';

import { useBoolean } from 'src/hooks/use-boolean';

import { createTask, updateColumn } from 'src/actions/kanban';

import { toast } from 'src/components/snackbar';

import ColumnBase from './column-base';
import { KanbanTaskAdd } from '../components/kanban-task-add';
import { KanbanColumnToolBar } from './kanban-column-toolbar';

// ----------------------------------------------------------------------

export function KanbanColumn({ children, column, tasks, disabled, sx }) {
  const openAddTask = useBoolean();

  const { attributes, isDragging, listeners, setNodeRef, transition, active, over, transform } =
    useSortable({
      id: column.id,
      data: { type: 'container', children: tasks },
      animateLayoutChanges,
    });

  const tasksIds = tasks.map((task) => task.id);

  const isOverContainer = over
    ? (column.id === over.id && active?.data.current?.type !== 'container') ||
      tasksIds.includes(over.id)
    : false;

  const handleUpdateColumn = useCallback(
    async (columnName) => {
      try {
        if (column.name !== columnName) {
          updateColumn(column.id, columnName);

          toast.success('Update success!', { position: 'top-center' });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, column.name]
  );

  const handleAddTask = useCallback(
    async (taskData) => {
      try {
        createTask(column.id, taskData);

        openAddTask.onFalse();
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, openAddTask]
  );

  return (
    <ColumnBase
    
      ref={disabled ? undefined : setNodeRef}
      sx={{ boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',transition, transform: CSS.Translate.toString(transform), ...sx }}
      stateProps={{
        dragging: isDragging,
        hover: isOverContainer,
        handleProps: { ...attributes, ...listeners },
      }}
      slots={{
        header: (
          <KanbanColumnToolBar
            handleProps={{ ...attributes, ...listeners }}
            totalTasks={tasks.length}
            onUpdateColumn={handleUpdateColumn}
            onToggleAddTask={openAddTask.onToggle}
          />
        ),
        main: <>{children}</>,
        action: (
          <KanbanTaskAdd
            status={column.name}
            openAddTask={openAddTask.value}
            onAddTask={handleAddTask}
            onCloseAddTask={openAddTask.onFalse}
          />
        ),
      }}
    />
  );
}

// ----------------------------------------------------------------------

const animateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });
