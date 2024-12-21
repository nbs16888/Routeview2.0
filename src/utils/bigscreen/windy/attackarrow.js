import DrawAttack from '@/utils/bigscreen/windy/drawAttack.js'
// (1.3) 燕尾箭头数据处理
export function getAttackcoordinates (startData, endData, num) {
        // 提供的坐标点
        let startPoint = startData;
        let endPoint = endData;
        // 转换为Turf.js点要素
        let start = turf.point(startPoint);
        let end = turf.point(endPoint);

        // 计算线段的角度
        let bearing = turf.bearing(start, end);

        // 获取新坐标离起始点有20公里距离
        let newStart = turf.destination(start, 20, bearing);
        let newEnd = turf.destination(end, -20, bearing);

        // 向南偏转90度，得到新的角度
        let bearingSouth = (bearing + 90) % 360;
        // 向北偏转90度，得到新的角度
        let bearingNorth = (bearing - 90 + 360) % 360;
        // 指定距离（单位：千米）
        let distance = Math.floor(Math.random() * (num - 10 + 1)) + 10;
        // 使用Turf.js计算向南偏转90度后的终点坐标;
        let endSouth = turf.destination(newStart, distance, bearingSouth);
        // 使用Turf.js计算向北偏转90度后的终点坐标
        let endNorth = turf.destination(newStart, distance, bearingNorth);
        return [endSouth.geometry.coordinates, endNorth.geometry.coordinates, newEnd.geometry.coordinates]
      }

      // (1.4) 绘制燕尾箭头
export function createAttackArrow (lnglatArr, properties,viewer,index) {
        let material = Cesium.Color.fromCssColorString('#d81e06').withAlpha(0.7);
        if (properties.color == 'red') {
          material = Cesium.Color.fromCssColorString('#d81e06').withAlpha(0.7);
        } else if (properties.color == 'blue') {
          material = Cesium.Color.fromCssColorString('#1296db').withAlpha(0.7);
        } else {
          material = Cesium.Color.fromCssColorString('#67C23A').withAlpha(0.7);
        }
        let drawAttack = new DrawAttack();
        let res = drawAttack.fineArrow(lnglatArr);
        let returnData = res.polygonalPoint;
        let entity = viewer.entities.getById('attackarrow'+index);
        if (Cesium.defined(entity)) {
            viewer.entities.remove(entity);
        }
        viewer.entities.add({
          id:"attackarrow"+index,
          name: 'polyon',
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(returnData),
            show: true,
            fill: true,
            clampToGround: true,
            material: material,
            height: 500
          }
        }
        );
      }
