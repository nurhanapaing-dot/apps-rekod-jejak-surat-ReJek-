import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText, PlusCircle, CheckCircle, Clock, AlertTriangle, Search, Filter, 
  UserCheck, FolderCheck, BarChart3, Settings, Upload, Download, RefreshCw, 
  Globe, Shield, LogOut, Eye, Edit3, ArrowRight, Check, X, File, Image, ChevronRight,
  TrendingUp, Calendar, AlertCircle, FileSpreadsheet, User, CheckSquare, Sparkles, Camera, Loader2
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';

// --- DATA AWAL & SPESIFIKASI BRS ---
const INITIAL_OFFICERS = [
  { id: 'azmir', name: 'En. Azmir', title: 'Penolong Jurutera Kanan Tertinggi (J8)', roleGroup: 'jurutera' },
  { id: 'hana', name: 'Hana', title: 'Penolong Jurutera Kanan (JA6)', roleGroup: 'jurutera' },
  { id: 'sham', name: 'Sham', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'riza', name: 'Riza', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'fairuz', name: 'Fairuz', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'zuriman', name: 'Zuriman', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'danial', name: 'Danial', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'saiful', name: 'Saiful', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'ayu', name: 'Ayu', title: 'Penolong Jurutera', roleGroup: 'pelaksana' },
  { id: 'fika', name: 'Fika', title: 'PKA', roleGroup: 'pka' },
  { id: 'maziah', name: 'Maziah', title: 'PKA', roleGroup: 'pka' },
  { id: 'azhar', name: 'Azhar', title: 'PKA', roleGroup: 'pka' },
];

const INITIAL_LETTERS = [
  {
    id: 'SRT-2026-001',
    title: 'Aduan Kerosakan Turapan Jalan Persekutuan FT005 Seksyen 12',
    sender: 'Majlis Perbandaran Port Dickson (MPPD)',
    refSender: 'MPPD/03/05/99(12)',
    refFile: 'JKR.PD.JLN.FT005.02',
    dateLetter: '2026-10-25',
    dateReceived: '2026-10-26',
    uploadTime: '2026-10-26 09:15',
    roadCategory: 'FT005 (Jalan Persekutuan)',
    securityClass: 'Terhad',
    letterType: 'Surat',
    registeredBy: 'Fika (PKA)',
    assignedTo: 'sham',
    instructions: 'Sila buat pemeriksaan tapak dan sediakan laporan perbaikan dalam masa 5 hari.',
    dateMinuted: '2026-10-27',
    dueDate: '2026-11-01',
    status: 'Dalam Tindakan',
    actionNotes: 'Pemeriksaan tapak telah dijalankan pada 28 Okt. Kontraktor penyelenggaraan telah dipanggil.',
    proofFiles: ['Gambar_Tapak_Sek12.png', 'Draf_Laporan_Tindakan.pdf'],
    fileLocation: '',
    filedDate: '',
    history: [
      { date: '2026-10-26 09:15', action: 'Surat didaftarkan oleh Fika (PKA)', user: 'Fika' },
      { date: '2026-10-27 10:30', action: 'Diminitkan kepada Sham oleh En. Azmir (J8)', user: 'En. Azmir (J8)' },
      { date: '2026-10-28 14:20', action: 'Kemas kini tindakan: Tapak disemak', user: 'Sham' }
    ]
  },
  {
    id: 'SRT-2026-002',
    title: 'Permohonan Pemasangan Lampu Isyarat Simpang Jalan Negeri N1',
    sender: 'Jawatankuasa Penduduk Kampung Teluk Kemang',
    refSender: 'JKKP/TK/2026/04',
    refFile: 'JKR.PD.JLN.N1.15',
    dateLetter: '2026-10-28',
    dateReceived: '2026-10-29',
    uploadTime: '2026-10-29 11:00',
    roadCategory: 'N1 (Jalan Negeri)',
    securityClass: 'Biasa',
    letterType: 'Surat',
    registeredBy: 'Maziah (PKA)',
    assignedTo: 'azmir',
    instructions: 'Semak kesesuaian geometri & rekod kemalangan dengan pihak PDRM.',
    dateMinuted: '2026-10-30',
    dueDate: '2026-11-05',
    status: 'Diminit',
    actionNotes: '',
    proofFiles: [],
    fileLocation: '',
    filedDate: '',
    history: [
      { date: '2026-10-29 11:00', action: 'Surat didaftarkan oleh Maziah (PKA)', user: 'Maziah' },
      { date: '2026-10-30 08:45', action: 'Diminitkan kepada En. Azmir oleh Jurutera Jalan', user: 'Jurutera Jalan' }
    ]
  },
  {
    id: 'SRT-2026-003',
    title: 'Notis Kebocoran Paip Air Memotong Jalan FT018',
    sender: 'Syarikat Air Negeri Sembilan (SAINS)',
    refSender: 'SAINS/PD/OPS/882',
    refFile: 'JKR.PD.JLN.FT018.09',
    dateLetter: '2026-11-01',
    dateReceived: '2026-11-02',
    uploadTime: '2026-11-02 08:30',
    roadCategory: 'FT018 (Jalan Persekutuan)',
    securityClass: 'Biasa',
    letterType: 'Emel',
    registeredBy: 'Azhar (PKA)',
    assignedTo: '',
    instructions: '',
    dateMinuted: '',
    dueDate: '',
    status: 'Baru',
    actionNotes: '',
    proofFiles: [],
    fileLocation: '',
    filedDate: '',
    history: [
      { date: '2026-11-02 08:30', action: 'Surat didaftarkan oleh Azhar (PKA)', user: 'Azhar' }
    ]
  },
  {
    id: 'SRT-2026-004',
    title: 'Permohonan Kelulusan Korekan Jalan Bagi Pemasangan Kabel Fiber Optik (Workbook1)',
    sender: 'Telekom Malaysia Berhad (TM)',
    refSender: 'TM/PD/INFRA/2026/102',
    refFile: 'JKR.PD.JLN.FT005.45',
    dateLetter: '2026-10-20',
    dateReceived: '2026-10-22',
    uploadTime: '2026-10-22 10:00',
    roadCategory: 'FT005 (Jalan Persekutuan)',
    securityClass: 'Biasa',
    letterType: 'Surat',
    registeredBy: 'Fika (PKA)',
    assignedTo: 'riza',
    instructions: 'Sila semak deposit permit jalan dan jadual kerja kontraktor.',
    dateMinuted: '2026-10-23',
    dueDate: '2026-10-30',
    status: 'Dalam Tindakan',
    actionNotes: 'Ulasan teknikal permohonan korekan sedang disediakan.',
    proofFiles: ['Pelan_Kabel_TM.pdf'],
    fileLocation: '',
    filedDate: '',
    history: [
      { date: '2026-10-22 10:00', action: 'Diimport daripada Workbook1.xlsx oleh PKA', user: 'Fika' },
      { date: '2026-10-23 11:30', action: 'Diminitkan kepada Riza oleh Hana (JA6)', user: 'Hana (JA6)' }
    ]
  },
  {
    id: 'SRT-2026-005',
    title: 'Aduan Papan Tanda Jalan Rosak & Terlindung Semak di N15 (Workbook1)',
    sender: 'Pejabat Daerah Dan Tanah Port Dickson',
    refSender: 'PDTD/PD/02/10(44)',
    refFile: 'JKR.PD.JLN.N15.08',
    dateLetter: '2026-10-15',
    dateReceived: '2026-10-17',
    uploadTime: '2026-10-17 14:10',
    roadCategory: 'N15 (Jalan Negeri)',
    securityClass: 'Biasa',
    letterType: 'Surat',
    registeredBy: 'Maziah (PKA)',
    assignedTo: 'fairuz',
    instructions: 'Gantikan papan tanda baharu dan buat pembersihan semak.',
    dateMinuted: '2026-10-18',
    dueDate: '2026-10-25',
    status: 'Selesai',
    actionNotes: 'Papan tanda baharu telah dipasang dan pembersihan semak selesai dijalankan.',
    proofFiles: ['Gambar_Siap_N15.jpg'],
    fileLocation: 'Rak B2, Fail JKR.PD.JLN.N15.08',
    filedDate: '2026-10-27',
    history: [
      { date: '2026-10-17 14:10', action: 'Diimport daripada Workbook1.xlsx oleh PKA', user: 'Maziah' },
      { date: '2026-10-18 09:00', action: 'Diminitkan kepada Fairuz oleh En. Azmir (J8)', user: 'En. Azmir (J8)' },
      { date: '2026-10-26 16:00', action: 'Tindakan selesai & difailkan di Rak B2', user: 'Fairuz' }
    ]
  }
];

// --- BAHASA TEKS BRS v2.2 ---
const TRANSLATIONS = {
  MY: {
    appTitle: 'Sistem Rekod & Penjejakan Surat Bahagian Jalan',
    agency: 'JKR Port Dickson',
    roles: {
      jurutera: 'Jurutera Jalan (Ketua Unit)',
      j8: 'Penolong Jurutera Kanan Tertinggi (J8)',
      ja6: 'Penolong Jurutera Kanan (JA6)',
      pelaksana: 'Pegawai Pelaksana (Penolong Jurutera & PKA)',
      pka: 'PKA (Pendaftar Surat)',
      admin: 'Pentadbir Sistem (Admin)'
    },
    tabs: {
      dashboard: 'Papan Pemuka',
      letters: 'Senarai Surat',
      register: 'Daftar Snap Kamera (AI)',
      myLetters: 'Surat Saya',
      reports: 'Laporan & Eksport',
      admin: 'Pengurusan Admin'
    },
    status: {
      baru: 'Baru',
      diminit: 'Diminit',
      dalamTindakan: 'Dalam Tindakan',
      selesai: 'Selesai',
      difailkan: 'Difailkan',
      lewat: 'Lewat (Overdue)'
    },
    stats: {
      total: 'Jumlah Surat',
      pendingMinuted: 'Belum Diminit',
      inAction: 'Dalam Tindakan',
      completed: 'Selesai (Belum Fail)',
      filed: 'Telah Difailkan',
      overdue: 'Surat Lewat'
    }
  },
  EN: {
    appTitle: 'Road Division Letter Tracking System',
    agency: 'JKR Port Dickson',
    roles: {
      jurutera: 'Road Engineer (Head)',
      j8: 'Senior Assistant Engineer (J8)',
      ja6: 'Senior Assistant Engineer (JA6)',
      pelaksana: 'Action Officer',
      pka: 'PKA (Registrar)',
      admin: 'System Administrator'
    },
    tabs: {
      dashboard: 'Dashboard',
      letters: 'All Letters',
      register: 'Camera Snap Register (AI)',
      myLetters: 'My Assigned Letters',
      reports: 'Reports & Export',
      admin: 'Admin Console'
    },
    status: {
      baru: 'New',
      diminit: 'Minuted',
      dalamTindakan: 'In Progress',
      selesai: 'Completed',
      difailkan: 'Filed',
      lewat: 'Overdue'
    },
    stats: {
      total: 'Total Letters',
      pendingMinuted: 'Pending Minute',
      inAction: 'In Action',
      completed: 'Completed (Unfiled)',
      filed: 'Filed',
      overdue: 'Overdue'
    }
  }
};

export default function App() {
  // State Utama
  const [lang, setLang] = useState('MY');
  const [role, setRole] = useState('jurutera'); // 'jurutera' | 'j8' | 'ja6' | 'pelaksana' | 'pka' | 'admin'
  const [currentOfficer, setCurrentOfficer] = useState('sham');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [letters, setLetters] = useState(INITIAL_LETTERS);
  const [officers, setOfficers] = useState(INITIAL_OFFICERS);
  
  // Modal & Modal States
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isMinuteModalOpen, setIsMinuteModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);

  // Penapis & Carian
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roadFilter, setRoadFilter] = useState('ALL');

  // Form States untuk Minit Surat
  const [minuteForm, setMinuteForm] = useState({ assignedTo: '', instructions: '', dueDate: '' });

  // Form States untuk Kemas Kini Tindakan
  const [actionForm, setActionForm] = useState({ notes: '', files: [] });

  // Form States untuk Pengfailan
  const [fileForm, setFileForm] = useState({ location: '' });

  // Form States untuk Pendaftaran Surat Baru (PKA AI OCR)
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [regForm, setRegForm] = useState({
    title: '',
    sender: '',
    refSender: '',
    refFile: '',
    dateLetter: new Date().toISOString().split('T')[0],
    dateReceived: new Date().toISOString().split('T')[0],
    roadCategory: 'FT005 (Jalan Persekutuan)',
    securityClass: 'Biasa',
    letterType: 'Surat',
    simulatedFile: null
  });

  // Semak jika peranan semasa berhak meminitkan surat (Jurutera Jalan, J8, JA6, atau Pelaksana Re-delegate)
  const canMinute = useMemo(() => {
    return role === 'jurutera' || role === 'j8' || role === 'ja6' || role === 'pelaksana' || role === 'admin';
  }, [role]);

  // Pengiraan Statistik (Stats)
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const total = letters.length;
    const baru = letters.filter(l => l.status === 'Baru').length;
    const diminit = letters.filter(l => l.status === 'Diminit').length;
    const dalamTindakan = letters.filter(l => l.status === 'Dalam Tindakan' || l.status === ' Dalam Tindakan').length;
    const selesai = letters.filter(l => l.status === 'Selesai').length;
    const difailkan = letters.filter(l => l.status === 'Difailkan').length;

    const overdue = letters.filter(l => {
      if (l.status === 'Selesai' || l.status === 'Difailkan') return false;
      return l.dueDate && l.dueDate < today;
    }).length;

    return { total, baru, diminit, dalamTindakan, selesai, difailkan, overdue };
  }, [letters]);

  // Data Graf Statistik
  const chartData = useMemo(() => {
    return [
      { name: 'Baru', Jumlah: stats.baru, fill: '#3b82f6' },
      { name: 'Diminit', Jumlah: stats.diminit, fill: '#f59e0b' },
      { name: 'Tindakan', Jumlah: stats.dalamTindakan, fill: '#6366f1' },
      { name: 'Selesai', Jumlah: stats.selesai, fill: '#10b981' },
      { name: 'Difailkan', Jumlah: stats.difailkan, fill: '#059669' },
      { name: 'Lewat', Jumlah: stats.overdue, fill: '#ef4444' }
    ];
  }, [stats]);

  // Beban Kerja Pelaksana
  const officerWorkloadData = useMemo(() => {
    return officers.map(o => {
      const count = letters.filter(l => l.assignedTo === o.id && l.status !== 'Difailkan').length;
      return { name: o.name, Tugasan: count };
    }).filter(d => d.Tugasan > 0);
  }, [letters, officers]);

  // Filter Senarai Surat
  const filteredLetters = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return letters.filter(l => {
      const matchSearch = 
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.refFile.toLowerCase().includes(searchTerm.toLowerCase());

      let matchStatus = true;
      if (statusFilter === 'OVERDUE') {
        matchStatus = l.status !== 'Selesai' && l.status !== 'Difailkan' && l.dueDate && l.dueDate < today;
      } else if (statusFilter !== 'ALL') {
        matchStatus = l.status.trim() === statusFilter.trim();
      }

      let matchRoad = true;
      if (roadFilter !== 'ALL') {
        matchRoad = l.roadCategory.includes(roadFilter);
      }

      return matchSearch && matchStatus && matchRoad;
    });
  }, [letters, searchTerm, statusFilter, roadFilter]);

  // Handlers Minit Surat (Boleh dibuat oleh Jurutera, J8, JA6, Pelaksana)
  const handleSaveMinute = (e) => {
    e.preventDefault();
    if (!selectedLetter) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const officerName = officers.find(o => o.id === minuteForm.assignedTo)?.name || minuteForm.assignedTo;
    
    let userTitle = 'Jurutera Jalan';
    if (role === 'j8') userTitle = 'En. Azmir (Penolong Jurutera Kanan Tertinggi J8)';
    else if (role === 'ja6') userTitle = 'Hana (Penolong Jurutera Kanan JA6)';
    else if (role === 'pelaksana') userTitle = `Pegawai Pelaksana (${officers.find(o => o.id === currentOfficer)?.name || 'Pelaksana'})`;

    setLetters(letters.map(l => {
      if (l.id === selectedLetter.id) {
        return {
          ...l,
          assignedTo: minuteForm.assignedTo,
          instructions: minuteForm.instructions,
          dueDate: minuteForm.dueDate,
          dateMinuted: nowStr.split(' ')[0],
          status: 'Dalam Tindakan',
          history: [
            ...l.history,
            { date: nowStr, action: `Diminitkan / Ditugaskan kepada ${officerName} (Tarikh Akhir: ${minuteForm.dueDate})`, user: userTitle }
          ]
        };
      }
      return l;
    }));

    setIsMinuteModalOpen(false);
    setSelectedLetter(null);
  };

  const handleSaveAction = (e) => {
    e.preventDefault();
    if (!selectedLetter) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setLetters(letters.map(l => {
      if (l.id === selectedLetter.id) {
        return {
          ...l,
          actionNotes: actionForm.notes,
          status: 'Selesai',
          history: [
            ...l.history,
            { date: nowStr, action: `Tindakan dikemas kini & ditanda Selesai oleh Pelaksana`, user: officers.find(o => o.id === l.assignedTo)?.name || 'Pelaksana' }
          ]
        };
      }
      return l;
    }));

    setIsActionModalOpen(false);
    setSelectedLetter(null);
  };

  const handleSaveFileLocation = (e) => {
    e.preventDefault();
    if (!selectedLetter) return;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setLetters(letters.map(l => {
      if (l.id === selectedLetter.id) {
        return {
          ...l,
          fileLocation: fileForm.location,
          filedDate: nowStr.split(' ')[0],
          status: 'Difailkan',
          history: [
            ...l.history,
            { date: nowStr, action: `Difailkan di lokasi: ${fileForm.location}`, user: 'Pelaksana/PKA' }
          ]
        };
      }
      return l;
    }));

    setIsFileModalOpen(false);
    setSelectedLetter(null);
  };

  // Function Scan Kamera AI OCR
  const handleAiScan = (fileObj) => {
    setIsAiScanning(true);
    
    if (fileObj && (fileObj.name || (typeof File !== 'undefined' && fileObj instanceof File))) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(fileObj);
    } else {
      setImagePreview('https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80');
    }

    setTimeout(() => {
      const sampleScans = [
        {
          title: 'Permohonan Kelulusan Pemasangan Kabel Fiber Optik Sepanjang Jalan FT005 Seksyen 8',
          sender: 'Telekom Malaysia (TM) Berhad',
          refSender: 'TM/NS/PD/2026/901',
          refFile: 'JKR.PD.JLN.FT005.19',
          roadCategory: 'FT005 (Jalan Persekutuan)',
          letterType: 'Surat',
          securityClass: 'Biasa'
        },
        {
          title: 'Aduan Semak Pokok Berisiko Tumbang Dan Longkang Tersumbat Di Jalan N1',
          sender: 'Majlis Perbandaran Port Dickson (MPPD)',
          refSender: 'MPPD/04/09/2026/55',
          refFile: 'JKR.PD.JLN.N1.48',
          roadCategory: 'N1 (Jalan Negeri)',
          letterType: 'Surat',
          securityClass: 'Biasa'
        }
      ];

      const scannedData = sampleScans[Math.floor(Math.random() * sampleScans.length)];

      setRegForm(prev => ({
        ...prev,
        title: scannedData.title,
        sender: scannedData.sender,
        refSender: scannedData.refSender,
        refFile: scannedData.refFile,
        roadCategory: scannedData.roadCategory,
        letterType: scannedData.letterType,
        securityClass: scannedData.securityClass,
        dateLetter: new Date().toISOString().split('T')[0]
      }));

      setIsAiScanning(false);
    }, 1700);
  };

  const t = TRANSLATIONS[lang];

  // Pendaftaran PKA
  const handleRegisterLetter = (e) => {
    e.preventDefault();
    const newId = `SRT-2026-0${letters.length + 1}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newLetter = {
      id: newId,
      title: regForm.title || 'Surat Masuk (Hasil Imbasan AI Kamera)',
      sender: regForm.sender || 'Pengirim Terimbas AI',
      refSender: regForm.refSender || 'N/A',
      refFile: regForm.refFile || 'JKR.PD.JLN.AM.01',
      dateLetter: regForm.dateLetter,
      dateReceived: regForm.dateReceived,
      uploadTime: nowStr,
      roadCategory: regForm.roadCategory,
      securityClass: regForm.securityClass,
      letterType: regForm.letterType,
      registeredBy: `${officers.find(o => o.id === 'fika')?.name || 'Fika'} (PKA)`,
      assignedTo: '',
      instructions: '',
      dateMinuted: '',
      dueDate: '',
      status: 'Baru',
      actionNotes: '',
      proofFiles: [regForm.simulatedFile ? regForm.simulatedFile.name : 'Imbasan_Kamera_PKA.jpg'],
      fileLocation: '',
      filedDate: '',
      history: [
        { date: nowStr, action: `Surat didaftarkan menggunakan Kamera AI OCR oleh PKA`, user: 'PKA' }
      ]
    };

    setLetters([newLetter, ...letters]);
    setRegForm({
      title: '',
      sender: '',
      refSender: '',
      refFile: '',
      dateLetter: new Date().toISOString().split('T')[0],
      dateReceived: new Date().toISOString().split('T')[0],
      roadCategory: 'FT005 (Jalan Persekutuan)',
      securityClass: 'Biasa',
      letterType: 'Surat',
      simulatedFile: null
    });
    setImagePreview(null);
    setActiveTab('letters');
  };

  const exportToCSV = () => {
    const headers = ["ID Surat", "Tajuk", "Pengirim", "No Rujukan Fail", "Tarikh Terima", "Pelaksana", "Status", "Lokasi Fail"];
    const rows = letters.map(l => [
      l.id,
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.sender.replace(/"/g, '""')}"`,
      l.refFile,
      l.dateReceived,
      officers.find(o => o.id === l.assignedTo)?.name || 'Belum Minit',
      l.status,
      `"${l.fileLocation || '-'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekod_Surat_JKR_PD_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* HEADER UTAMA */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Tajuk & Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 text-slate-900 p-2 rounded-lg font-bold flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide text-amber-400">
                  {t.appTitle}
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{t.agency}</span>
                  <span className="inline-block w-1 h-1 bg-slate-500 rounded-full"></span>
                  <span className="text-amber-500 font-medium">Bahagian Jalan (BRS v2.2)</span>
                </p>
              </div>
            </div>

            {/* Selector Peranan Sesuai BRS v2.2 */}
            <div className="flex items-center gap-3">
              
              <button 
                onClick={() => setLang(lang === 'MY' ? 'EN' : 'MY')}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs px-2.5 py-1.5 rounded-md border border-slate-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-slate-200">{lang}</span>
              </button>

              <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                <span className="text-slate-400 px-2 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Peranan Kebenaran:</span>
                </span>
                <select 
                  value={role} 
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (e.target.value === 'pelaksana') setActiveTab('myLetters');
                    else if (e.target.value === 'pka') setActiveTab('register');
                    else setActiveTab('dashboard');
                  }}
                  className="bg-slate-900 text-amber-300 font-medium rounded px-2 py-1 outline-none border border-slate-700 cursor-pointer"
                >
                  <option value="jurutera">Jurutera Jalan (Ketua)</option>
                  <option value="j8">Penolong Jurutera Kanan Tertinggi (J8)</option>
                  <option value="ja6">Penolong Jurutera Kanan (JA6)</option>
                  <option value="pelaksana">Pegawai Pelaksana (PJ & PKA)</option>
                  <option value="pka">PKA (Pendaftar Imbas)</option>
                  <option value="admin">Pentadbir (Admin)</option>
                </select>
              </div>

              {role === 'pelaksana' && (
                <div className="hidden sm:flex items-center bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-1 rounded text-xs">
                  <span className="mr-1 text-slate-400">Pegawai:</span>
                  <select 
                    value={currentOfficer} 
                    onChange={(e) => setCurrentOfficer(e.target.value)}
                    className="bg-transparent font-semibold outline-none cursor-pointer text-amber-300"
                  >
                    {officers.map(o => (
                      <option key={o.id} value={o.id} className="bg-slate-900 text-white">
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* NAVIGASI TAB */}
        <div className="bg-slate-800/80 border-t border-slate-700/50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex space-x-1 overflow-x-auto py-2 scrollbar-none">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {t.tabs.dashboard}
            </button>

            <button
              onClick={() => setActiveTab('letters')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'letters' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              {t.tabs.letters}
              <span className="ml-1 px-1.5 py-0.2 bg-slate-900 text-amber-300 rounded-full text-[10px]">
                {letters.length}
              </span>
            </button>

            {(role === 'pka' || role === 'admin' || role === 'jurutera' || role === 'j8' || role === 'ja6') && (
              <button
                onClick={() => setActiveTab('register')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                  activeTab === 'register' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <Camera className="w-4 h-4" />
                {t.tabs.register}
              </button>
            )}

            {role === 'pelaksana' && (
              <button
                onClick={() => setActiveTab('myLetters')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                  activeTab === 'myLetters' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                {t.tabs.myLetters}
                <span className="ml-1 px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[10px]">
                  {letters.filter(l => l.assignedTo === currentOfficer).length}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'reports' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              {t.tabs.reports}
            </button>

            {role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition whitespace-nowrap ${
                  activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                {t.tabs.admin}
              </button>
            )}

          </div>
        </div>
      </header>

      {/* KANDUNGAN UTAMA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* BANNER STATUS PERANAN AKTIF BRS v2.2 */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  Mod Peranan BRS v2.2: {t.roles[role]}
                </span>
                {canMinute && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    ✓ Boleh Minit & Tugaskan Staf
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {(role === 'jurutera' || role === 'j8' || role === 'ja6') && 'Anda dibenarkan oleh BRS v2.2 untuk meminitkan surat, memilih pegawai pelaksana, dan menetapkan tarikh akhir.'}
                {role === 'pelaksana' && 'Pegawai Pelaksana: Boleh melihat tugasan, mengemaskini tindakan/bukti, memfailkan surat, serta meminitkan semula jika perlu.'}
                {role === 'pka' && 'PKA Pendaftar: Ambil gambar surat snap kamera, AI auto-isi rekod.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setLetters(INITIAL_LETTERS)}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition border border-slate-600 self-end md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Data Sampel
          </button>
        </div>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-500 text-[11px] font-semibold">{t.stats.total}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-slate-800">{stats.total}</span>
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-500 text-[11px] font-semibold">{t.stats.pendingMinuted}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-amber-600">{stats.baru}</span>
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-500 text-[11px] font-semibold">{t.stats.inAction}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-indigo-600">{stats.dalamTindakan + stats.diminit}</span>
                  <UserCheck className="w-5 h-5 text-indigo-500" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-500 text-[11px] font-semibold">{t.stats.completed}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-emerald-600">{stats.selesai}</span>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-slate-500 text-[11px] font-semibold">{t.stats.filed}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-teal-700">{stats.difailkan}</span>
                  <FolderCheck className="w-5 h-5 text-teal-600" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-sm flex flex-col justify-between">
                <span className="text-rose-700 text-[11px] font-semibold">{t.stats.overdue}</span>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-black text-rose-600">{stats.overdue}</span>
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    Pecahan Surat Mengikut Status Aliran Kerja
                  </h3>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="Jumlah" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-500" />
                    Beban Kerja Aktif Pelaksana
                  </h3>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={officerWorkloadData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={70} />
                      <Tooltip />
                      <Bar dataKey="Tugasan" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SENARAI SURAT */}
        {(activeTab === 'letters' || activeTab === 'myLetters') && (
          <div className="space-y-4 animate-fadeIn">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari Tajuk, No Fail, Pengirim..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="Baru">Baru (Belum Minit)</option>
                  <option value="Diminit">Diminit</option>
                  <option value="Dalam Tindakan">Dalam Tindakan</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Difailkan">Difailkan</option>
                  <option value="OVERDUE">⚠️ Lewat (Overdue)</option>
                </select>

                <select
                  value={roadFilter}
                  onChange={(e) => setRoadFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium text-slate-700 outline-none cursor-pointer"
                >
                  <option value="ALL">Semua Jalan</option>
                  <option value="FT005">FT005 (Persekutuan)</option>
                  <option value="FT018">FT018 (Persekutuan)</option>
                  <option value="N1">N1 (Negeri)</option>
                  <option value="N15">N15 (Negeri)</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[11px]">
                      <th className="p-3">ID & Tarikh</th>
                      <th className="p-3">Perihal / Tajuk Surat</th>
                      <th className="p-3">No. Fail JKR PD</th>
                      <th className="p-3">Pengirim</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Pelaksana & Status</th>
                      <th className="p-3 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLetters
                      .filter(l => activeTab === 'myLetters' ? l.assignedTo === currentOfficer : true)
                      .map((letter) => {
                        const assignedOfficer = officers.find(o => o.id === letter.assignedTo);
                        const isOverdue = letter.status !== 'Selesai' && letter.status !== 'Difailkan' && letter.dueDate && letter.dueDate < new Date().toISOString().split('T')[0];

                        return (
                          <tr key={letter.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-3 whitespace-nowrap">
                              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block w-fit">
                                {letter.id}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                Terima: {letter.dateReceived}
                              </span>
                            </td>

                            <td className="p-3 max-w-xs sm:max-w-md">
                              <p className="font-bold text-slate-800 line-clamp-2 leading-snug">
                                {letter.title}
                              </p>
                              {letter.instructions && (
                                <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded mt-1 border border-amber-200/50">
                                  <strong>Minit:</strong> {letter.instructions}
                                </p>
                              )}
                            </td>

                            {/* Lajur Khas Nombor Rujukan Fail JKR PD */}
                            <td className="p-3 whitespace-nowrap">
                              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/70 inline-flex items-center gap-1 shadow-xs">
                                <FolderCheck className="w-3.5 h-3.5 text-amber-600" />
                                {letter.refFile || 'JKR.PD.JLN.AM.01'}
                              </span>
                              {letter.fileLocation && (
                                <span className="text-[10px] font-semibold text-teal-700 block mt-1">
                                  📍 Rak: {letter.fileLocation}
                                </span>
                              )}
                            </td>

                            <td className="p-3">
                              <span className="font-semibold text-slate-700 block">{letter.sender}</span>
                              <span className="text-[10px] font-mono text-slate-400 block">{letter.refSender}</span>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {letter.roadCategory}
                              </span>
                            </td>

                            <td className="p-3 whitespace-nowrap space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  letter.status === 'Baru' ? 'bg-blue-100 text-blue-800' :
                                  letter.status === 'Diminit' ? 'bg-amber-100 text-amber-800' :
                                  letter.status.includes('Tindakan') ? 'bg-indigo-100 text-indigo-800' :
                                  letter.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                                  'bg-teal-100 text-teal-800'
                                }`}>
                                  {letter.status}
                                </span>

                                {isOverdue && (
                                  <span className="px-1.5 py-0.5 bg-rose-500 text-white font-bold rounded text-[9px] flex items-center gap-0.5 animate-pulse">
                                    <AlertTriangle className="w-2.5 h-2.5" /> Lewat
                                  </span>
                                )}
                              </div>

                              {assignedOfficer ? (
                                <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                                  <UserCheck className="w-3 h-3 text-indigo-500" />
                                  {assignedOfficer.name}
                                </span>
                              ) : (
                                <span className="text-[10px] text-amber-600 italic">Belum ditugaskan</span>
                              )}
                            </td>

                            <td className="p-3 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedLetter(letter)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition"
                                  title="Lihat Perincian"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Butang Minit Kebenaran BRS v2.2 */}
                                {canMinute && (
                                  <button
                                    onClick={() => {
                                      setSelectedLetter(letter);
                                      setMinuteForm({
                                        assignedTo: letter.assignedTo || 'sham',
                                        instructions: letter.instructions || '',
                                        dueDate: letter.dueDate || new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0]
                                      });
                                      setIsMinuteModalOpen(true);
                                    }}
                                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] rounded-md shadow-sm transition flex items-center gap-1"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                    {letter.assignedTo ? 'Tugaskan Semula' : 'Minit & Tugaskan'}
                                  </button>
                                )}

                                {(role === 'pelaksana' || role === 'admin') && (letter.status.includes('Tindakan') || letter.status === 'Diminit') && (
                                  <button
                                    onClick={() => {
                                      setSelectedLetter(letter);
                                      setActionForm({ notes: letter.actionNotes || '', files: [] });
                                      setIsActionModalOpen(true);
                                    }}
                                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded-md transition"
                                  >
                                    Kemaskini Tindakan
                                  </button>
                                )}

                                {(role === 'pelaksana' || role === 'pka' || role === 'admin') && letter.status === 'Selesai' && (
                                  <button
                                    onClick={() => {
                                      setSelectedLetter(letter);
                                      setFileForm({ location: letter.fileLocation || '' });
                                      setIsFileModalOpen(true);
                                    }}
                                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] rounded-md transition"
                                  >
                                    Rekod Fail
                                  </button>
                                )}

                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* DAFTAR SNAP KAMERA AI (PKA) */}
        {(activeTab === 'register' && (role === 'pka' || role === 'admin' || canMinute)) && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
            
            <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Daftar Surat Snap Gambar Kamera (BRS v2.2 AI Auto)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  PKA hanya perlu snap gambar surat. Maklumat surat akan dimasukkan secara automatik oleh AI.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-5 space-y-3">
                <label className="font-semibold text-xs text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-500" />
                  Snap Gambar Surat Dari Telefon / Imbas
                </label>

                <div className="relative border-2 border-dashed border-amber-400 bg-amber-50/40 rounded-xl p-4 text-center overflow-hidden min-h-[260px] flex flex-col items-center justify-center transition hover:bg-amber-50/80">
                  
                  {isAiScanning && (
                    <div className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-4">
                      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent top-0 animate-bounce shadow-lg shadow-amber-400"></div>
                      <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-2" />
                      <p className="font-bold text-xs text-amber-300">AI Sedang Membaca Dokumen Surat...</p>
                    </div>
                  )}

                  {imagePreview ? (
                    <div className="relative w-full space-y-2">
                      <img 
                        src={imagePreview} 
                        alt="Imbasan Surat" 
                        className="w-full h-48 object-cover rounded-lg border border-slate-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleAiScan(null)}
                        className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Snap Semula Gambar (AI Auto)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-amber-500/20 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">Ruangan Snap Gambar Surat</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Ambil gambar menggunakan telefon PKA</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAiScan(null)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Sparkles className="w-4 h-4" />
                        Snap Gambar & Imbas AI Now
                      </button>
                    </div>
                  )}

                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <form onSubmit={handleRegisterLetter} className="space-y-3 text-xs">
                  
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Tajuk / Perihal Surat (Hasil AI Auto)</label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Snap gambar surat di sebelah untuk auto-pengisian..."
                      value={regForm.title}
                      onChange={(e) => setRegForm({ ...regForm, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Surat Daripada (Pengirim)</label>
                      <input
                        type="text"
                        required
                        value={regForm.sender}
                        onChange={(e) => setRegForm({ ...regForm, sender: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">No. Rujukan Fail JKR PD</label>
                      <input
                        type="text"
                        required
                        value={regForm.refFile}
                        onChange={(e) => setRegForm({ ...regForm, refFile: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Kategori / No. Jalan</label>
                      <select
                        value={regForm.roadCategory}
                        onChange={(e) => setRegForm({ ...regForm, roadCategory: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        <option value="FT005 (Jalan Persekutuan)">FT005 (Jalan Persekutuan)</option>
                        <option value="FT018 (Jalan Persekutuan)">FT018 (Jalan Persekutuan)</option>
                        <option value="N1 (Jalan Negeri)">N1 (Jalan Negeri)</option>
                        <option value="N15 (Jalan Negeri)">N15 (Jalan Negeri)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Tarikh Terima</label>
                      <input
                        type="date"
                        value={regForm.dateReceived}
                        onChange={(e) => setRegForm({ ...regForm, dateReceived: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow transition flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Sahkan & Simpan Rekod PKA
                    </button>
                  </div>

                </form>
              </div>

            </div>

          </div>
        )}

        {/* LAPORAN & EKSPORT */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  Laporan Ringkasan & Eksport Rekod BRS v2.2
                </h2>
                <p className="text-xs text-slate-500">
                  Ringkasan status agihan, kepatuhan minit 48 jam, dan eksport data ke Excel.
                </p>
              </div>

              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg flex items-center gap-2 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                Muat Turun Laporan CSV
              </button>
            </div>
          </div>
        )}

        {/* PENGURUSAN ADMIN */}
        {(activeTab === 'admin' && role === 'admin') && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                Pentadbiran Sistem BRS v2.2 & Import Excel Lama
              </h2>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
                <p className="font-bold text-slate-700">Import Data Google Sheets / Excel (Q13 BRS)</p>
                <button 
                  onClick={() => alert('Simulasi Import: Rekod Excel lama berjaya diimport.')}
                  className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-md shadow-sm"
                >
                  Mula Import CSV
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL VIEW DETAILS */}
      {selectedLetter && !isMinuteModalOpen && !isActionModalOpen && !isFileModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 animate-scaleUp text-xs">
            
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between rounded-t-xl">
              <span className="font-mono text-xs font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                {selectedLetter.id}
              </span>
              <button onClick={() => setSelectedLetter(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-800">{selectedLetter.title}</h3>
              <p className="text-slate-600">Pengirim: <strong>{selectedLetter.sender}</strong></p>
              
              {selectedLetter.instructions && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <strong>Minit Arahan:</strong> {selectedLetter.instructions}
                </div>
              )}

              <div className="space-y-2 border-t pt-3">
                <h4 className="font-bold text-slate-800">Jejak Sejarah Status (Audit Trail BRS):</h4>
                {selectedLetter.history.map((h, i) => (
                  <div key={i} className="text-[11px] text-slate-600">
                    • <strong>{h.user}</strong>: {h.action} ({h.date})
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button onClick={() => setSelectedLetter(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MINIT SURAT (UNTUK JURUTERA, J8, JA6, PELAKSANA) */}
      {isMinuteModalOpen && selectedLetter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 animate-scaleUp">
            
            <div className="p-4 bg-amber-500 text-slate-950 flex items-center justify-between rounded-t-xl">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Minit & Tugaskan Pegawai Pelaksana (BRS v2.2)
              </h3>
              <button onClick={() => setIsMinuteModalOpen(false)} className="text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMinute} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 font-medium">
                {selectedLetter.title}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Pilih Pegawai Pelaksana *</label>
                <select
                  required
                  value={minuteForm.assignedTo}
                  onChange={(e) => setMinuteForm({ ...minuteForm, assignedTo: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                >
                  <option value="">-- Pilih Pegawai --</option>
                  {officers.map(off => (
                    <option key={off.id} value={off.id}>
                      {off.name} ({off.title})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Arahan Tindakan Minit *</label>
                <textarea
                  required
                  rows="3"
                  value={minuteForm.instructions}
                  onChange={(e) => setMinuteForm({ ...minuteForm, instructions: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Tarikh Akhir (Due Date) *</label>
                <input
                  type="date"
                  required
                  value={minuteForm.dueDate}
                  onChange={(e) => setMinuteForm({ ...minuteForm, dueDate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsMinuteModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg shadow">
                  Simpan & Sahkan Minit
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL KEMAS KINI TINDAKAN */}
      {isActionModalOpen && selectedLetter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 animate-scaleUp">
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between rounded-t-xl">
              <h3 className="font-bold text-sm">Kemas Kini Tindakan Pelaksana</h3>
              <button onClick={() => setIsActionModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveAction} className="p-5 space-y-4 text-xs">
              <textarea
                required
                rows="3"
                placeholder="Masukkan catatan tindakan..."
                value={actionForm.notes}
                onChange={(e) => setActionForm({ ...actionForm, notes: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              ></textarea>
              <div className="flex justify-end gap-2 border-t pt-3">
                <button type="button" onClick={() => setIsActionModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow">Tanda Selesai</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FAILKAN */}
      {isFileModalOpen && selectedLetter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 animate-scaleUp">
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between rounded-t-xl">
              <h3 className="font-bold text-sm">Rekod Lokasi Fail Fizikal</h3>
              <button onClick={() => setIsFileModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveFileLocation} className="p-5 space-y-4 text-xs">
              <input
                type="text"
                required
                placeholder="Rak A3, Fail No JKR.PD.JLN.FT005.02"
                value={fileForm.location}
                onChange={(e) => setFileForm({ ...fileForm, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border rounded-lg"
              />
              <div className="flex justify-end gap-2 border-t pt-3">
                <button type="button" onClick={() => setIsFileModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow">Simpan & Difailkan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-4 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Sistem Rekod & Penjejakan Surat Bahagian Jalan © 2026 JKR Port Dickson</span>
          <span className="text-slate-500">Versi 2.2 (Sokongan Penolong Jurutera Kanan & Snap Kamera AI)</span>
        </div>
      </footer>

    </div>
  );
}