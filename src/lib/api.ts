import { supabase } from '@/lib/supabase';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: 'investable' | 'investor';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status:
    | 'pending'
    | 'accepted'
    | 'rejected'
    | 'under_review'
    | 'under_investment'
    | 'invested';
  investment_amount?: number;
  repayment_period?: number;
  interest_rate?: number;
  investment_type?: string;
  created_at: string;
  updated_at: string;
}

export interface Request {
  id: string;
  from_user_id: string;
  to_user_id: string;
  project_id: string;
  type: 'pitch_session' | 'investment' | 'document_access';
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
  from_user?: User;
  to_user?: User;
  project?: Project;
}

export interface Investor {
  id: string;
  user_id: string;
  company_name?: string;
  logo_url?: string;
  description?: string;
  investment_criteria?: string;
  funding_methods?: string[];
  min_investment?: number;
  max_investment?: number;
  avg_investment_time?: string;
  investment_domains?: string[];
  investment_type?: string;
  contact_info?: any;
  created_at: string;
  updated_at: string;
}

// User CRUD
export const userApi = {
  async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) throw error;
  },
};

// Project CRUD
export const projectApi = {
  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    console.log('projectApi.getAll called');
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(
          `
          *,
          users:user_id (
            id,
            name,
            email
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Projects data:', data);
      return data;
    } catch (err) {
      console.error('Error in projectApi.getAll:', err);
      throw err;
    }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select(
        `
        *,
        users:user_id (
          id,
          name,
          email
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;
  },
};

// Request CRUD
export const requestApi = {
  async create(request: Omit<Request, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('requests')
      .insert([request])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('requests')
      .select(
        `
        *,
        from_user:from_user_id (
          id,
          name,
          email
        ),
        to_user:to_user_id (
          id,
          name,
          email
        ),
        projects:project_id (
          id,
          title
        )
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('requests')
      .select(
        `
        *,
        from_user:from_user_id (
          id,
          name,
          email
        ),
        to_user:to_user_id (
          id,
          name,
          email
        ),
        projects:project_id (
          id,
          title
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Request>) {
    const { data, error } = await supabase
      .from('requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('requests').delete().eq('id', id);

    if (error) throw error;
  },
};

// Investor CRUD
export const investorApi = {
  async create(investor: Omit<Investor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('investors')
      .insert([investor])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('investors')
      .select(
        `
        *,
        users:user_id (
          id,
          name,
          email
        )
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('investors')
      .select(
        `
        *,
        users:user_id (
          id,
          name,
          email
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Investor>) {
    const { data, error } = await supabase
      .from('investors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('investors').delete().eq('id', id);

    if (error) throw error;
  },
};
