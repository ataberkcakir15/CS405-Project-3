/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
  constructor(meshDrawer, trs, parent = null) {
    this.meshDrawer = meshDrawer;
    this.trs = trs;
    this.parent = parent;
    this.children = [];

    if (parent) {
      this.parent.__addChild(this);
    }
  }

  __addChild(node) {
    this.children.push(node);
  }

  draw(mvp, modelView, normalMatrix, modelMatrix) {
    var localMatrix = this.trs.getTransformationMatrix();

    var newModelMatrix = MatrixMult(modelMatrix, localMatrix);
    var newModelViewMatrix = MatrixMult(modelView, localMatrix);
    var newMvp = MatrixMult(mvp, localMatrix);
    var newNormalMatrix = getNormalMatrix(newModelViewMatrix);

    if (this.meshDrawer) {
      this.meshDrawer.draw(
        newMvp,
        newModelViewMatrix,
        newNormalMatrix,
        newModelMatrix
      );
    }

    for (var i = 0; i < this.children.length; i++) {
      this.children[i].draw(
        newMvp,
        newModelViewMatrix,
        newNormalMatrix,
        newModelMatrix
      );
    }
  }
}
