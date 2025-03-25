-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create developer_skills junction table
CREATE TABLE IF NOT EXISTS developer_skills (
  developer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (developer_id, skill_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
  developer_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  is_available BOOLEAN DEFAULT true,
  available_hours INTEGER CHECK (available_hours BETWEEN 0 AND 168),
  preferred_work_type TEXT[] CHECK (preferred_work_type <@ ARRAY['full-time', 'part-time', 'contract']),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE developer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies for developer_skills
CREATE POLICY "Developer skills are viewable by everyone"
  ON developer_skills FOR SELECT
  USING (true);

CREATE POLICY "Developers can manage their own skills"
  ON developer_skills FOR ALL
  USING (auth.uid() = developer_id);

-- Create policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- Create policies for availability
CREATE POLICY "Availability is viewable by everyone"
  ON availability FOR SELECT
  USING (true);

CREATE POLICY "Developers can manage their own availability"
  ON availability FOR ALL
  USING (auth.uid() = developer_id);

-- Create trigger for reviews updated_at
CREATE TRIGGER set_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Insert some default skills
INSERT INTO skills (name, category) VALUES
  ('JavaScript', 'Programming'),
  ('TypeScript', 'Programming'),
  ('React', 'Frontend'),
  ('Node.js', 'Backend'),
  ('Python', 'Programming'),
  ('Java', 'Programming'),
  ('SQL', 'Database'),
  ('AWS', 'Cloud'),
  ('Docker', 'DevOps'),
  ('Git', 'Version Control'),
  ('UI/UX Design', 'Design'),
  ('Mobile Development', 'Mobile'),
  ('Machine Learning', 'AI/ML'),
  ('Blockchain', 'Web3'),
  ('Security', 'Security')
ON CONFLICT (name) DO NOTHING; 