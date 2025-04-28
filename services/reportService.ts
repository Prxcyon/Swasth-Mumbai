import { DiseaseReport } from '../types';

// Mock data for reports
const MOCK_REPORTS: DiseaseReport[] = [
  {
    id: 'd1',
    disease_type: 'Dengue',
    symptoms: ['fever', 'headache', 'rash'],
    location: { lat: 19.0890, lon: 72.8679 },
    reported_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reported_by: 'user1',
    confirmations: 7,
    denials: 1,
    total_votes: 8,
    legitimacy_percentage: 88,
    status: 'confirmed'
  },
  {
    id: 'd2',
    disease_type: 'Gastroenteritis',
    symptoms: ['vomiting', 'diarrhea', 'abdominal pain'],
    location: { lat: 19.0720, lon: 72.8530 },
    reported_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reported_by: 'user2',
    confirmations: 4,
    denials: 3,
    total_votes: 7,
    legitimacy_percentage: 57,
    status: 'pending'
  }
];

export const fetchDiseaseReports = async (
  lat: number,
  lon: number,
  radius: number = 10
): Promise<DiseaseReport[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter reports based on location proximity (simplified)
  return MOCK_REPORTS.filter((report) => {
    const distance = Math.sqrt(
      Math.pow(report.location.lat - lat, 2) + 
      Math.pow(report.location.lon - lon, 2)
    ) * 111; // Rough conversion to km
    
    return distance <= radius;
  });
};

export const createDiseaseReport = async (
  report: Omit<DiseaseReport, 'id' | 'confirmations' | 'denials' | 'total_votes' | 'legitimacy_percentage' | 'status'>
): Promise<DiseaseReport> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newReport: DiseaseReport = {
    ...report,
    id: `d${Date.now()}`,
    confirmations: 0,
    denials: 0,
    total_votes: 0,
    legitimacy_percentage: 0,
    status: 'pending'
  };
  
  MOCK_REPORTS.push(newReport);
  return newReport;
};

export const voteOnReport = async (
  reportId: string,
  vote: 'confirm' | 'deny',
  userId: string
): Promise<DiseaseReport> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const report = MOCK_REPORTS.find(r => r.id === reportId);
  if (!report) {
    throw new Error('Report not found');
  }
  
  // Update vote counts
  if (vote === 'confirm') {
    report.confirmations++;
  } else {
    report.denials++;
  }
  
  report.total_votes = report.confirmations + report.denials;
  report.legitimacy_percentage = Math.round((report.confirmations / report.total_votes) * 100);
  
  // Update status based on votes
  if (report.total_votes >= 5) {
    report.status = report.legitimacy_percentage >= 70 ? 'confirmed' : 
                   report.legitimacy_percentage <= 30 ? 'rejected' : 'pending';
  }
  
  return report;
};