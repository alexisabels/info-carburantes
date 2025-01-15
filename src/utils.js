export const getStatusAndTimetable = (horario) => {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 100 + now.getMinutes();

  const days = ["D", "L", "M", "X", "J", "V", "S"];
  const currentDay = days[day];

  let status = "Cerrada";
  let formattedTimetable = horario;

  if (horario.includes("24H")) {
    formattedTimetable = "Abierta 24/7";
    status = "Abierta";
  } else {
    const schedules = horario.split(";").map((s) => s.trim());
    schedules.forEach((schedule) => {
      const [daysRange, startHour, thingToSplit, endMinute] = schedule
        .split(":")
        .map((s) => s.trim());
      const [startMin, endHour] = thingToSplit
        .split("-")
        .map((t) => parseInt(t));
      const [startDay, endDay] = daysRange.split("-");
      const openTime = parseInt(startHour) * 100 + parseInt(startMin);
      const closeTime = parseInt(endHour) * 100 + parseInt(endMinute);

      const isDayInRange =
        (startDay === "L" && endDay === "D") ||
        (days.indexOf(currentDay) >= days.indexOf(startDay) &&
          days.indexOf(currentDay) <= days.indexOf(endDay));

      if (isDayInRange) {
        if (time >= openTime && time < closeTime) {
          status = "Abierta";
        }
      }
    });
  }

  return { status, formattedTimetable };
};
