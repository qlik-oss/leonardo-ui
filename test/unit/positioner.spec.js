import * as positioner from '../../src/util/positioner';

describe('Positioner', () => {
  beforeEach(() => {
    global.document = {
      body: {
        scrollTop: 0,
        scrollLeft: 0,
        scrollWidth: 500,
        scrollHeight: 500
      },
      documentElement: {
        scrollTop: 0,
        scrollLeft: 0,
        scrollWidth: 500,
        scrollHeight: 500
      }
    };
    global.window = {
      pageYOffset: 0,
      pageXOffset: 0
    };
  });

  afterEach(() => {
    delete global.innerHeight;
    delete global.innerWidth;
    delete global.document;
  });

  it('should get the opposite dock', () => {
    expect(positioner.oppositeDock('top')).to.equal('bottom');
    expect(positioner.oppositeDock('right')).to.equal('left');
    expect(positioner.oppositeDock('bottom')).to.equal('top');
    expect(positioner.oppositeDock('left')).to.equal('right');
  });

  it('should create rects', () => {
    let rect = positioner.createRect(0, 0, 10, 10);
    expect(rect).to.deep.equal({
      left: 0,
      top: 0,
      width: 10,
      height: 10,
      right: 10,
      bottom: 10
    });
    rect = positioner.createRect(-10, -10, 20, 20);
    expect(rect).to.deep.equal({
      left: -10,
      top: -10,
      width: 20,
      height: 20,
      right: 10,
      bottom: 10
    });
    rect = positioner.createRect(5, 5, 2.5, 2.5);
    expect(rect).to.deep.equal({
      left: 5,
      top: 5,
      width: 2.5,
      height: 2.5,
      right: 7.5,
      bottom: 7.5
    });
  });

  it('should get the center point of a rect', () => {
    const rect = positioner.createRect(10, 10, 30, 25);
    expect(positioner.getDockCenterPoint(rect, 'top')).to.deep.equal({
      left: 25,
      top: 10
    });
    expect(positioner.getDockCenterPoint(rect, 'right')).to.deep.equal({
      left: 40,
      top: 22.5
    });
    expect(positioner.getDockCenterPoint(rect, 'bottom')).to.deep.equal({
      left: 25,
      top: 35
    });
    expect(positioner.getDockCenterPoint(rect, 'left')).to.deep.equal({
      left: 10,
      top: 22.5
    });
  });

  it('should succeed to dock to right and bottom', () => {
    const elemRect = positioner.createRect(0, 0, 100, 100);
    const alignToRect = positioner.createRect(50, 50, 50, 10);
    const windowRect = positioner.createRect(0, 0, 500, 500);

    expect(positioner.tryDock(elemRect, alignToRect, windowRect, 'bottom').fits).to.equal(true);
    expect(positioner.tryDock(elemRect, alignToRect, windowRect, 'right').fits).to.equal(true);
    expect(positioner.tryDock(elemRect, alignToRect, windowRect, 'left').fits).to.equal(false);
    expect(positioner.tryDock(elemRect, alignToRect, windowRect, 'top').fits).to.equal(false);
  });

  it('should succeed to dock after realigning the element', () => {
    const elemRect = positioner.createRect(0, 0, 200, 200);
    const topLeftRect = positioner.createRect(50, 50, 50, 50);
    const bottomRightRect = positioner.createRect(400, 400, 50, 50);
    const windowRect = positioner.createRect(0, 0, 500, 500);

    expect(positioner.tryDock(elemRect, topLeftRect, windowRect, 'bottom').fits).to.equal(true);
    expect(positioner.tryDock(elemRect, topLeftRect, windowRect, 'right').fits).to.equal(true);
    expect(positioner.tryDock(elemRect, bottomRightRect, windowRect, 'left').fits).to.equal(true);
    expect(positioner.tryDock(elemRect, bottomRightRect, windowRect, 'top').fits).to.equal(true);
  });

  describe('position to an element', () => {
    let element;
    let alignToElement;

    beforeEach(() => {
      element = {
        getBoundingClientRect() {
          return positioner.createRect(0, 0, 200, 200);
        }
      };
      alignToElement = {
        getBoundingClientRect() {
          return positioner.createRect(50, 50, 50, 50);
        }
      };
    });

    it('should position to the "bottom"', () => {
      const result = positioner.positionToElement(element, alignToElement, 'bottom');
      expect(result).to.deep.equal({
        fits: true,
        dock: 'bottom',
        position: {
          top: 100,
          left: 0
        },
        toPosition: {
          top: 100,
          left: 75
        }
      });
    });

    it('should position to "right" after failing to "left" and "top"', () => {
      const result = positioner.positionToElement(element, alignToElement, ['left', 'top', 'right']);
      expect(result).to.deep.equal({
        fits: true,
        dock: 'right',
        position: {
          top: 0,
          left: 100
        },
        toPosition: {
          top: 75,
          left: 100
        }
      });
    });

    it('should position to "bottom" with an offset', () => {
      const result = positioner.positionToElement(element, alignToElement, 'bottom', {
        offset: 5,
        minWindowOffset: 8
      });
      expect(result).to.deep.equal({
        fits: true,
        dock: 'bottom',
        position: {
          top: 105,
          left: 8
        },
        toPosition: {
          top: 100,
          left: 75
        }
      });
    });


    it('should fail to position to "bottom" because of min edge offset', () => {
      const result = positioner.positionToElement(element, alignToElement, 'bottom', {
        minEdgeOffset: 80
      });
      expect(result).to.deep.equal({
        fits: false,
        dock: 'bottom',
        position: {
          top: 100,
          left: -5
        },
        toPosition: {
          top: 100,
          left: 75
        }
      });
    });
  });
});
