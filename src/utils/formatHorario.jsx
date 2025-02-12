export const formatHorario = (horario) =>
  horario.split(";").map((line, index, array) => (
    <div key={index}>
      {line.trim()}
      {index < array.length - 1 && ","}
    </div>
  ));
