game.item = function(gemometry, material, mass, name, onEquipe, onUse, onUnEquipe, bestShape){
	this.gemometry = gemometry;
	this.material = material;
	this.name = name;
	this.onEquipe = onEquipe;
	this.onUse = onUse;
	this.onUnEquipe= onUnEquipe;
	this.mass = mass;
	this.getThreeMesh = function(){
		return new THREE.Mesh(gemometry, material);
	}
	this.getPhysiMesh = function(){
		switch(bestShape){
			case 0:
			return new Physijs.ConvexMesh(this.gemometry,this.material,this.mass);
			break;
			case 1:
			return new Physijs.BoxMesh(this.gemometry,this.material,this.mass)
			break;
			case 2:
			return new Physijs.CapsuleMesh(this.gemometry,this.material,this.mass)
			break;
			case 3:
			return new Physijs.ConcaveMesh(this.gemometry,this.material,this.mass)
			break;
			case 4:
			return new Physijs.ConeMesh(this.gemometry,this.material,this.mass)
			break;
			case 5:
			return new Physijs.CylinderMesh(this.gemometry,this.material,this.mass)
			break;
			default:
			return new Physijs.ConvexMesh(this.gemometry,this.material,this.mass);
			break;
		}
	}
}