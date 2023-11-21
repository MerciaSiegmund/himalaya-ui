import { useEffect, useState } from 'react';
import Checkbox from '../checkbox';
import Text from '../text';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { SeriesType } from '../use-charts/model/series-options';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useChart } from './chart-context';
import { ILegendStatesDictonary, LegendDictonary } from './shared';

const ChartLegends: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const { chart } = useChart();
  const [_series, _setSeries] = useState<LegendDictonary>({});
  const [legends, setLegends] = useState<ILegendStatesDictonary>([]);
  const theme = useTheme();
  const { SCALES } = useScale();

  const addNewSerie = (props: ISeriesApi<SeriesType>) => {
    const newSeries = { ..._series };
    newSeries[props.seriesID()] = props;
    _setSeries(newSeries);

    legends.push({
      visible: props.options().visible,
      title: props.options().title,
      key: props.seriesID(),
    });

    setLegends(legends);
  };

  const deleteChartDetected = (props: ISeriesApi<SeriesType>) => {
    const newSeries = { ..._series };
    delete newSeries[props.seriesID()];

    _setSeries(newSeries);
    setLegends(legends.filter(a => a.key !== props.seriesID()));
  };

  //init
  //implement on title update
  useEffect(() => {
    if (chart) {
      for (const serie of chart.getSeries()) {
        addNewSerie(serie);
      }

      chart.subscribeNewSerie(addNewSerie);
      chart.subscribeDestroyedSerie(deleteChartDetected);

      return () => {
        chart.unsubscribeNewSerie(addNewSerie);
        chart.unsubscribeDestroyedSerie(deleteChartDetected);
      };
    }
  }, [chart]);

  const onVisibleChanged = (legendIds: string[]) => {
    for (const serieId in _series) {
      _series[serieId].applyOptions({ visible: legendIds.includes(serieId) });

      const newLegends = legends.map(df => {
        df.visible = legendIds.includes(df.key);
        return df;
      });

      setLegends(newLegends);
    }
  };

  return (
    legends &&
    legends.length > 0 && (
      <div {...props} className="chart-legends">
        <Text pr={1.5} small style={{ color: theme.palette.accents_3 }}>
          Legend
        </Text>
        <Checkbox.Group scale={0.75} className="legends" onChange={onVisibleChanged} value={legends.filter(df => df.visible).map(df => df.key)}>
          {legends.map(legend => (
            <Checkbox key={legend.key} className="series-checkbox" value={legend.key}>
              {legend.title}
            </Checkbox>
          ))}
        </Checkbox.Group>

        <style jsx>{`
          .chart-legends {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: ${theme.palette.accents_0};
            border-radius: 0 0 ${theme.style.radius} ${theme.style.radius};
            padding: ${SCALES.pt(0.475)} ${SCALES.pr(0.875)} ${SCALES.pb(0.475)} ${SCALES.pl(0.875)};
            margin: ${SCALES.mt(1)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
        `}</style>
      </div>
    )
  );
};

ChartLegends.displayName = 'HimalayaChartLegends';
export default withScale(ChartLegends);
