// API服务配置和调用函数

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// API响应类型定义
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 事件相关API
export interface EventRegistration {
  eventId: string
  eventTitle: string
  userId?: string
  userEmail?: string
  userName?: string
  timestamp: string
  formData?: Record<string, any>
}

export interface EventData {
  id: string
  title: string
  description: string
  date: string
  location: string
  participants: number
  maxParticipants?: number
  registrations?: EventRegistration[]
}

// 用户相关API
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  provider: string
  joinDate: string
  events: string[]
  projects: string[]
}

// 通用API调用函数
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    }
  } catch (error) {
    console.error('API call failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// 事件相关API调用
export const eventApi = {
  // 获取所有事件
  getAllEvents: () => apiCall<EventData[]>('/events'),
  
  // 获取单个事件详情
  getEvent: (eventId: string) => apiCall<EventData>(`/events/${eventId}`),
  
  // 注册事件
  registerEvent: (registration: EventRegistration) => 
    apiCall<{ registrationId: string }>('/events/register', {
      method: 'POST',
      body: JSON.stringify(registration),
    }),
  
  // 取消事件注册
  cancelRegistration: (eventId: string, userId: string) => 
    apiCall(`/events/${eventId}/cancel`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    }),
  
  // 获取用户的事件注册列表
  getUserRegistrations: (userId: string) => 
    apiCall<EventRegistration[]>(`/events/registrations/${userId}`),
}

// 用户相关API调用
export const userApi = {
  // 获取用户资料
  getProfile: (userId: string) => apiCall<UserProfile>(`/users/${userId}`),
  
  // 更新用户资料
  updateProfile: (userId: string, profile: Partial<UserProfile>) => 
    apiCall<UserProfile>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),
  
  // 用户登录
  login: (provider: string, token: string) => 
    apiCall<{ user: UserProfile; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ provider, token }),
    }),
  
  // 用户登出
  logout: (userId: string) => 
    apiCall('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
}

// 项目相关API调用
export interface ProjectData {
  id: string
  title: string
  description: string
  author: string
  authorId: string
  githubUrl?: string
  demoUrl?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export const projectApi = {
  // 获取所有项目
  getAllProjects: () => apiCall<ProjectData[]>('/projects'),
  
  // 获取单个项目
  getProject: (projectId: string) => apiCall<ProjectData>(`/projects/${projectId}`),
  
  // 创建项目
  createProject: (project: Omit<ProjectData, 'id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<ProjectData>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  
  // 更新项目
  updateProject: (projectId: string, project: Partial<ProjectData>) => 
    apiCall<ProjectData>(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  
  // 删除项目
  deleteProject: (projectId: string) => 
    apiCall(`/projects/${projectId}`, {
      method: 'DELETE',
    }),
}

// 资源相关API调用
export interface ResourceData {
  id: string
  title: string
  description: string
  category: string
  type: 'article' | 'video' | 'course' | 'tool' | 'book'
  url: string
  author?: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  createdAt: string
}

export const resourceApi = {
  // 获取所有资源
  getAllResources: () => apiCall<ResourceData[]>('/resources'),
  
  // 获取单个资源
  getResource: (resourceId: string) => apiCall<ResourceData>(`/resources/${resourceId}`),
  
  // 创建资源
  createResource: (resource: Omit<ResourceData, 'id' | 'createdAt'>) => 
    apiCall<ResourceData>('/resources', {
      method: 'POST',
      body: JSON.stringify(resource),
    }),
}

// 联系表单API调用
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export const contactApi = {
  // 提交联系表单
  submitContact: (formData: ContactFormData) => 
    apiCall<{ messageId: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
}

// 飞书集成API调用
export const feishuApi = {
  // 提交飞书表单数据
  submitForm: (formData: Record<string, any>) => 
    apiCall<{ submissionId: string }>('/feishu/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
  
  // 获取飞书表单配置
  getFormConfig: (formId: string) => 
    apiCall<{ formUrl: string; fields: any[] }>(`/feishu/forms/${formId}`),
}

// 统计数据API调用
export const analyticsApi = {
  // 获取网站统计数据
  getStats: () => apiCall<{
    totalUsers: number
    totalEvents: number
    totalProjects: number
    totalResources: number
    recentActivity: any[]
  }>('/analytics/stats'),
  
  // 记录页面访问
  trackPageView: (page: string, userId?: string) => 
    apiCall('/analytics/pageview', {
      method: 'POST',
      body: JSON.stringify({ page, userId, timestamp: new Date().toISOString() }),
    }),
}

export default {
  eventApi,
  userApi,
  projectApi,
  resourceApi,
  contactApi,
  feishuApi,
  analyticsApi,
}