game.item = function(mesh, mass, friction, restitution, name, onEquipe, onUse, onUnEquipe, bestShape, position, scale){
	this.mesh = mesh;
	this.name = name;
	this.onEquipe = onEquipe;
	this.onUse = onUse;
	this.onUnEquipe= onUnEquipe;
	this.mass = mass;
	this.position = position;
	this.scale = scale;
	this.getThreeMesh = function(){
		return this.mesh;
	}
	this.getPhysiMesh = function(){
		switch(bestShape){
			case 0:
			return new Physijs.ConvexMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass);
			break;
			case 1:
			return new Physijs.BoxMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass)
			break;
			case 2:
			return new Physijs.CapsuleMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass)
			break;
			case 3:
			return new Physijs.ConcaveMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass)
			break;
			case 4:
			return new Physijs.ConeMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass)
			break;
			case 5:
			return new Physijs.CylinderMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass)
			break;
			default:
			return new Physijs.ConvexMesh(mesh.geometry.clone(),Physijs.createMaterial(mesh.material, friction, restitution),this.mass);
			break;
		}
	}
}