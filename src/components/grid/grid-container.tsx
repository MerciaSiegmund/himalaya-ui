'use client';
import React, { useMemo } from 'react';
import css from 'styled-jsx/css';
import useClasses from '../use-classes';
import useScale, { ScaleResponsiveParameter, extractNumberFromScaleProp, withScale } from '../use-scale';
import GridBasicItem, { GridBasicItemProps } from './basic-item';
import { GridWrap } from './grid-types';

interface Props {
  gap?: ScaleResponsiveParameter<number>;
  order?: ScaleResponsiveParameter<number>;
  wrap?: GridWrap;
  className?: string;
}

export type GridContainerProps = Props & GridBasicItemProps;

const GridContainerComponent: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap = 0,
  wrap = 'wrap' as GridWrap,
  children,
  className = '',
  ...props
}: React.PropsWithChildren<GridContainerProps>) => {
  const { unit, SCALES } = useScale();
  const defaultGap = extractNumberFromScaleProp(gap);
  const gapUnit = useMemo(() => `calc(${defaultGap} * ${unit} * 1/3)`, [defaultGap, unit]);
  const { className: resolveClassName, styles } = css.resolve`
    div {
      --grid-gap-unit: ${gapUnit};
      --grid-container-margin: calc(-1 * var(--grid-gap-unit));
      --grid-container-width: calc(100% + var(--grid-gap-unit) * 2);
      display: flex;
      flex-wrap: ${wrap};
      box-sizing: border-box;
      width: ${SCALES.w(1, 'var(--grid-container-width)')};
      margin: ${SCALES.mt(0, 'var(--grid-container-margin)')} ${SCALES.mr(0, 'var(--grid-container-margin)')} ${SCALES.mb(0, 'var(--grid-container-margin)')}
        ${SCALES.ml(0, 'var(--grid-container-margin)')};
    }
  `;
  const classes = useClasses(resolveClassName, className);

  return (
    <GridBasicItem className={classes} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
};

GridContainerComponent.displayName = 'HimalayaGridContainer';
const GridContainer = withScale(GridContainerComponent);
export default GridContainer;
