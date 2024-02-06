import './StatisticsPanel.css'

function StatisticsPanel({
  lettersOrder,
  position,
  points,
  lettersStats,
}) {
  const length = lettersOrder.length;
  const lettersStatsValues = Object.values(lettersStats);
  const allTime = lettersStatsValues.reduce((acc, item) => acc + item.time, 1);
  lettersStatsValues.sort((a, b) => a.time > b.time ? -1 : 1);
  let worstVelocity = '-';
  if (lettersStatsValues[0]) {
    if (lettersStatsValues[0].time > 0) {
      worstVelocity = ''
      for (let i = 0; i <5; i++) {
        if (lettersStatsValues[i].time > 0) worstVelocity += ' ' + lettersStatsValues[i].button + ' ';
      }
    }
  }
  lettersStatsValues.sort((a, b) => a.distance > b.distance ? -1 : 1);
  let worstAccuracy = '-';
  if (lettersStatsValues[0]) {
    if (lettersStatsValues[0].distance > 0) {
      worstAccuracy = ''
      for (let i = 0; i <5; i++) {
        if (lettersStatsValues[i].distance > 0) worstAccuracy += ' ' + lettersStatsValues[i].button + ' ';
      }
    }
  }
  return (
    <div className="statisticsPanel">
      <h2 className="statisticsPanelHeadline">Информация</h2>
      <div className="infoTitle">
        Символов осталось:
        <p className="infoValue">{length - position}</p>
      </div>
      <div className="infoTitle">
        Заработано очков:<br/><br/>
        Скорость:
        <p className="infoValue">{points.velocity}</p>
        (Максимум: {length * 15})<br/><br/>
        Точность:
        <p className="infoValue">{points.accuracy}</p>
        (Максимум: {length * 15})<br/><br/>
        Всего:
        <p className="infoValue">{points.all}</p>
        (Максимум: {length * 30})
      </div>
      <div className="infoTitle">
        Знаков в минуту:
        <p className="infoValue">{Math.round(position * 60000 / allTime)}</p>
      </div>
      <div className="infoTitle">
        Худшая скорость:
        <p className="infoValue">{worstVelocity}</p>
      </div>
      <div className="infoTitle">
        Худшая точность:
        <p className="infoValue">{worstAccuracy}</p>
      </div>

    </div>
  )
};

export default StatisticsPanel;
