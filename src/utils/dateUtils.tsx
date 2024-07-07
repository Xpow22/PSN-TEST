const getCurrentDate = (): string => {
    const daysOfWeek: string[] = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months: string[] = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
  
    const currentDate: Date = new Date();
    const dayOfWeek: string = daysOfWeek[currentDate.getDay()];
    const day: number = currentDate.getDate();
    const month: string = months[currentDate.getMonth()];
    const year: number = currentDate.getFullYear();
  
    return `${dayOfWeek}, ${day} ${month} ${year}`;
  };
  
  export { getCurrentDate };