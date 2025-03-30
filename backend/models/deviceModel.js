const supabase = require('../config/supabase');

const Device = {
  create: async (mac_address, name) => {
    const { data: existingDevice, error: findError } = await supabase
      .from('devices')
      .select('*')
      .eq('mac_address', mac_address)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      throw findError;
    }

    if (existingDevice) {
      return { message: 'Dispositivo já cadastrado!' };
    }

    const { data, error } = await supabase
      .from('devices')
      .insert([{ mac_address, name }]);

    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase.from('devices').select('*');
    if (error) throw error;
    return data;
  },

  update: async (id, name) => {
    const { data, error } = await supabase
      .from('devices')
      .update({ name })
      .eq('id', id);

    if (error) throw error;
    return data;
  },

  delete: async (id) => {
    const { data, error } = await supabase.from('devices').delete().eq('id', id);
    if (error) throw error;
    return data;
  },

  saveData: async (mac_address, temperature, humidity) => {
    const { data: existingDevice, error: findError } = await supabase
      .from('devices')
      .select('*')
      .eq('mac_address', mac_address)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      throw findError;
    }

    if (!existingDevice) {
      throw new Error('Dispositivo não cadastrado!');
    }

    const { data, error } = await supabase
      .from('device_data')
      .insert([{ mac_address, temperature, humidity }]);

    if (error) throw error;
    return data;
  }
};

module.exports = Device;
