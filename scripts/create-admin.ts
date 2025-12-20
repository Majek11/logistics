import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing required environment variables:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdminUser() {
    const email = 'admin@kennylogisticsservices.com';
    const password = 'password123';

    console.log('Creating admin user...');
    console.log('Email:', email);

    try {
        // Create the user with the admin client
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm the email
        });

        if (error) {
            console.error('Error creating user:', error.message);
            process.exit(1);
        }

        console.log('✅ Admin user created successfully!');
        console.log('User ID:', data.user?.id);
        console.log('\nYou can now login with:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('\n⚠️  Remember to change the password after first login!');
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

createAdminUser();
