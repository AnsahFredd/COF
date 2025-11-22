export const AdminPermission = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_EVENTS: 'view_events',
  EDIT_EVENTS: 'edit_events',
  DELETE_EVENTS: 'delete_events',
  VIEW_BOOKINGS: 'view_bookings',
  EDIT_BOOKINGS: 'edit_bookings',
  DELETE_BOOKINGS: 'delete_bookings',
  VIEW_NOTIFICATIONS: 'view_notifications',
  MANAGE_NOTIFICATIONS: 'manage_notifications',
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
};

export const ROLE_PERMISSIONS = {
  admin: [
    AdminPermission.VIEW_DASHBOARD,
    AdminPermission.VIEW_EVENTS,
    AdminPermission.EDIT_EVENTS,
    AdminPermission.DELETE_EVENTS,
    AdminPermission.VIEW_BOOKINGS,
    AdminPermission.EDIT_BOOKINGS,
    AdminPermission.DELETE_BOOKINGS,
    AdminPermission.VIEW_NOTIFICATIONS,
    AdminPermission.MANAGE_NOTIFICATIONS,
    AdminPermission.VIEW_USERS,
    AdminPermission.MANAGE_USERS,
  ],
  user: [
    AdminPermission.VIEW_DASHBOARD,
    AdminPermission.VIEW_EVENTS,
    AdminPermission.VIEW_BOOKINGS,
    AdminPermission.VIEW_NOTIFICATIONS,
  ],
};
