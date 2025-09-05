import { useState, useEffect } from 'react';
import {
  userApi,
  projectApi,
  requestApi,
  investorApi,
  User,
  Project,
  Request,
  Investor,
} from '@/lib/api';

// User Hooks
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (
    user: Omit<User, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newUser = await userApi.create(user);
      setUsers(prev => [newUser, ...prev]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      throw err;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const updatedUser = await userApi.update(id, updates);
      setUsers(prev => prev.map(user => (user.id === id ? updatedUser : user)));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userApi.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
};

// Project Hooks
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectApi.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newProject = await projectApi.create(project);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await projectApi.update(id, updates);
      setProjects(prev =>
        prev.map(project => (project.id === id ? updatedProject : project))
      );
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectApi.delete(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
};

// Request Hooks
export const useRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await requestApi.getAll();
      setRequests(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const createRequest = async (
    request: Omit<Request, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newRequest = await requestApi.create(request);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request');
      throw err;
    }
  };

  const updateRequest = async (id: string, updates: Partial<Request>) => {
    try {
      const updatedRequest = await requestApi.update(id, updates);
      setRequests(prev =>
        prev.map(request => (request.id === id ? updatedRequest : request))
      );
      return updatedRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request');
      throw err;
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      await requestApi.delete(id);
      setRequests(prev => prev.filter(request => request.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete request');
      throw err;
    }
  };

  return {
    requests,
    loading,
    error,
    createRequest,
    updateRequest,
    deleteRequest,
    refetch: fetchRequests,
  };
};

// Investor Hooks
export const useInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      const data = await investorApi.getAll();
      setInvestors(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch investors'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  const createInvestor = async (
    investor: Omit<Investor, 'id' | 'created_at' | 'updated_at'>
  ) => {
    try {
      const newInvestor = await investorApi.create(investor);
      setInvestors(prev => [newInvestor, ...prev]);
      return newInvestor;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create investor'
      );
      throw err;
    }
  };

  const updateInvestor = async (id: string, updates: Partial<Investor>) => {
    try {
      const updatedInvestor = await investorApi.update(id, updates);
      setInvestors(prev =>
        prev.map(investor => (investor.id === id ? updatedInvestor : investor))
      );
      return updatedInvestor;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update investor'
      );
      throw err;
    }
  };

  const deleteInvestor = async (id: string) => {
    try {
      await investorApi.delete(id);
      setInvestors(prev => prev.filter(investor => investor.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete investor'
      );
      throw err;
    }
  };

  return {
    investors,
    loading,
    error,
    createInvestor,
    updateInvestor,
    deleteInvestor,
    refetch: fetchInvestors,
  };
};
